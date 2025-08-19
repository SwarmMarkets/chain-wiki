import differenceWith from 'lodash/differenceWith'
import React, { useEffect, useMemo, useState } from 'react'
import useNFT from 'src/hooks/subgraph/useNFT'
import useTokens from 'src/hooks/subgraph/useTokens'
import {
  EditedIndexPagesState,
  EditingToken,
  useEditingStore,
} from 'src/shared/store/editing-store'
import {
  generateIpfsIndexPagesContent,
  IpfsIndexPage,
  isSameEthereumAddress,
  TokensQueryFullData,
  unifyAddressToId,
} from 'src/shared/utils'
import {
  convertIndexPagesToNodes,
  convertNodesToIndexPages,
  convertTokensToIndexPages,
  isHiddenList,
} from './utils'
import { HIDDEN_INDEX_PAGES_ID } from './const'
import { EditNodeModel } from './EditIndexPagesTree/types'
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import { useActiveAccount } from 'thirdweb/react'
import { PreparedTransaction } from 'thirdweb'
import { useIpfsUpload } from 'src/hooks/web3/useIpfsUpload'
import useSX1155NFT from 'src/hooks/contracts/nft/useSX1155NFT'
import useSendBatchTxs from 'src/hooks/web3/useSendBatchTxs'
import { generatePath, Link } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import { useTranslation } from 'react-i18next'

const useEdit = (readonly?: boolean) => {
  const { t } = useTranslation('common')
  const { nftId } = useNFTIdParam()
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })
  const account = useActiveAccount()

  const {
    editedTokens,
    addedTokens,
    editedIndexPages,
    currEditableToken,
    initIndexPages,
    getEditedTokenById,
    updateOrCreateEditedToken,
    updateOrCreateAddedToken,
    updateIndexPage,
    updateIndexPages,
    updateCurrEditableToken,
    addIndexPage,
    resetTokens,
  } = useEditingStore()

  useEffect(() => {
    initIndexPages(nft?.indexPagesContent?.indexPages || [])
  }, [initIndexPages, nft?.indexPagesContent?.indexPages])

  const {
    fullTokens,
    loading: fullTokensLoading,
    refetching: refetchingFullTokens,
  } = useTokens(
    {
      variables: {
        filter: { nft: unifyAddressToId(nftId) },
        limit: 100,
      },
      skip: !nftId,
    },
    { fetchFullData: true }
  )

  // Генерация уникальных slug-ов с учётом связей токенов, indexPages и fullTokens
  const normalizeSlugs = (
    addedTokens: EditingToken[],
    editedTokens: EditingToken[],
    editedIndexPages: EditedIndexPagesState,
    fullTokens: TokensQueryFullData[] = []
  ) => {
    // Collect all elements into a single list
    const allItems = [
      ...addedTokens.map(t => ({
        id: t.id,
        slug: t.slug,
        name: t.name,
      })),
      ...editedTokens.map(t => ({
        id: t.id,
        slug: t.slug,
        name: t.name,
      })),
    ]

    // fullTokens are only taken into account for slug occupancy
    const occupiedSlugs = new Set(fullTokens.map(t => t.slug))

    const slugCount: Record<string, number> = {}
    const updatedSlugs: Record<string, string> = {}

    allItems.forEach(item => {
      const baseSlug = item.slug
      let newSlug = baseSlug
      let i = 1

      // check both busy slugs from fullTokens and those already processed
      while (occupiedSlugs.has(newSlug) || slugCount[newSlug]) {
        i++
        newSlug = `${baseSlug}-${i}`
      }

      slugCount[newSlug] = 1
      updatedSlugs[item.id] = newSlug

      occupiedSlugs.add(newSlug) // to be taken into account in subsequent iterations
    })

    // Apply new slugs to tokens and indexPages
    const normalizedAddedTokens: EditingToken[] = addedTokens.map(t => ({
      ...t,
      slug: updatedSlugs[t.id],
    }))
    const normalizedEditedTokens: EditingToken[] = editedTokens.map(t => ({
      ...t,
      slug: updatedSlugs[t.id],
    }))
    const normalizedEditedIndexPages: EditedIndexPagesState = {
      isEdited: editedIndexPages.isEdited,
      items: editedIndexPages.items.map(p => {
        if (updatedSlugs[p.tokenId]) {
          return { ...p, slug: updatedSlugs[p.tokenId] }
        }
        return p
      }),
    }

    console.log({
      normalizedAddedTokens,
      normalizedEditedTokens,
      normalizedEditedIndexPages,
    })

    return {
      normalizedAddedTokens,
      normalizedEditedTokens,
      normalizedEditedIndexPages,
    }
  }

  const { mutateAsync: upload } = useIpfsUpload()

  useEffect(() => {
    if (!fullTokens || currEditableToken) return

    const firstToken = findFirstNonGroupVisibleNode(
      nft?.indexPagesContent?.indexPages
    )
    const firstTokenContent =
      fullTokens?.find(t => isSameEthereumAddress(t.id, firstToken?.tokenId))
        ?.ipfsContent?.htmlContent || ''

    if (firstToken) {
      updateCurrEditableToken({
        id: firstToken.tokenId,
        name: firstToken.title,
        content: firstTokenContent,
        slug: firstToken.slug,
      })
    }
  }, [
    currEditableToken,
    fullTokens,
    nft?.indexPagesContent?.indexPages,
    updateCurrEditableToken,
  ])

  const { sendBatchTxs } = useSendBatchTxs()

  const [mergeLoading, setMergeLoading] = useState(false)

  const {
    prepareSetTokenKyaTx,
    prepareUpdateTokenSlugTx,
    prepareSetContractKyaTx,
    prepareMintBatchTx,
  } = useSX1155NFT(nftId)

  const updateTokenName = (
    id: string,
    data: { name: string; slug: string }
  ) => {
    const addedToken = addedTokens.find(t => t.id === id)

    if (addedToken) {
      updateOrCreateAddedToken({
        ...addedToken,
        name: data.name,
        slug: data.slug,
      })
    } else {
      const token = fullTokens?.find(t => t.id === id)
      const editedToken = getEditedTokenById(id)

      if (token) {
        const content =
          editedToken?.content || token.ipfsContent?.htmlContent || ''

        updateOrCreateEditedToken({
          id: token.id,
          name: data.name,
          slug: data.slug,
          content,
        })
      }
    }

    const indexPageToUpdate = editedIndexPages.items.find(p => p.tokenId === id)

    if (indexPageToUpdate) {
      updateIndexPage({
        ...indexPageToUpdate,
        title: data.name,
        slug: data.slug,
      })
    }
  }

  const merge = async () => {
    setMergeLoading(true)
    const txs: PreparedTransaction[] = []
    try {
      // 1. Normalize slugs to avoid conflicts
      const {
        normalizedAddedTokens,
        normalizedEditedIndexPages,
        normalizedEditedTokens,
      } = normalizeSlugs(
        addedTokens,
        editedTokens,
        editedIndexPages,
        fullTokens
      )

      // 2. Prepare all files for upload
      const filesToUpload: string[] = []
      const editedTokenIndices: number[] = []
      const addedTokenIndices: number[] = []

      normalizedEditedTokens.forEach((token, i) => {
        filesToUpload.push(
          JSON.stringify({
            tokenId: +token.id.split('-')[1],
            address: nftId,
            htmlContent: token.content,
          })
        )
        editedTokenIndices.push(i)
      })
      normalizedAddedTokens.forEach((token, i) => {
        filesToUpload.push(
          JSON.stringify({
            tokenId: +token.id.split('-')[1],
            address: nftId,
            htmlContent: token.content,
          })
        )
        addedTokenIndices.push(normalizedEditedTokens.length + i)
      })

      // 2. Batch upload
      let uris: string[] = []
      if (filesToUpload.length > 0) {
        const uploadResult = await upload(filesToUpload)
        uris = Array.isArray(uploadResult) ? uploadResult : [uploadResult]
      }

      // 3. Prepare txs for edited tokens
      normalizedEditedTokens.forEach((token, i) => {
        const tokenId = +token.id.split('-')[1]
        const uri = uris[editedTokenIndices[i]]
        if (uri) {
          const tokenContentUpdateTx = prepareSetTokenKyaTx({
            tokenId: BigInt(tokenId),
            Kya: JSON.stringify({ uri, name: token.name }),
          })
          if (tokenContentUpdateTx) {
            txs.push(tokenContentUpdateTx)
          }

          const slugIsEdited =
            fullTokens?.find(t => t.id === token.id)?.slug !== token.slug

          if (slugIsEdited) {
            const tokenSlugUpdateTx = prepareUpdateTokenSlugTx({
              tokenId: BigInt(tokenId),
              slug: token.slug,
            })
            if (tokenSlugUpdateTx) {
              txs.push(tokenSlugUpdateTx)
            }
          }
        }
      })

      // 4. Prepare batch mint tx for added tokens
      if (normalizedAddedTokens.length > 0 && account?.address) {
        const accounts = normalizedAddedTokens.map(() => account.address)
        const quantities = normalizedAddedTokens.map(() => 1n)
        const tokenURIs = normalizedAddedTokens.map((_, i) => {
          const uri = uris[addedTokenIndices[i]]
          return JSON.stringify({ uri, name: normalizedAddedTokens[i].name })
        })
        const slugs = normalizedAddedTokens.map(token => token.slug)
        const tokenContentMintBatchTx = prepareMintBatchTx({
          accounts,
          quantities,
          tokenURIs,
          slugs,
        })
        if (tokenContentMintBatchTx) {
          txs.push(tokenContentMintBatchTx)
        }
      }

      if (normalizedEditedIndexPages.isEdited) {
        const indexPagesIpfsContent = generateIpfsIndexPagesContent({
          indexPages: normalizedEditedIndexPages.items,
          address: nftId,
        })
        const uri = (await upload([indexPagesIpfsContent])) as string

        if (uri) {
          const tokenContentUpdateTx = prepareSetContractKyaTx({
            Kya: JSON.stringify({ indexPagesUri: uri }),
          })
          if (tokenContentUpdateTx) {
            txs.push(tokenContentUpdateTx)
          }
        }
      }

      const siteUrl = generatePath(RoutePaths.NFT_READ, {
        nftIdOrSlug: nft?.slug || '',
      })

      const receipt = await sendBatchTxs(txs, {
        successMessage: (
          <>
            {t('toasts.siteUpdated', { ns: 'common' })}{' '}
            <Link
              to={siteUrl}
              target='_blank'
              className='underline text-main-accent hover:text-main'
            >
              {t('toasts.viewSite', { ns: 'common' })}
            </Link>
          </>
        ),
        errorMessage: t('toasts.merge_error'),
      })

      if (
        receipt?.status == SafeClientTxStatus.EXECUTED ||
        receipt?.status == SafeClientTxStatus.DEPLOYED_AND_EXECUTED
      ) {
        resetTokens()
      }

      console.log(receipt)
    } catch (e) {
      console.error(e)
    } finally {
      setMergeLoading(false)
    }
  }

  const hiddenIndexPages = useMemo(() => {
    return convertTokensToIndexPages(
      differenceWith(
        fullTokens,
        editedIndexPages.items,
        (a, b) => a.id === b.tokenId
      )
    )
  }, [editedIndexPages.items, fullTokens])

  const treeData = React.useMemo<EditNodeModel[]>(() => {
    const editedIndexPagesNodes = convertIndexPagesToNodes(
      editedIndexPages.items
    )

    if (readonly) {
      return editedIndexPagesNodes
    }

    const hiddenIndexPagesList: EditNodeModel = {
      id: HIDDEN_INDEX_PAGES_ID,
      droppable: true,
      text: 'Hidden pages',
      parent: 0,
    }
    const hiddenIndexPagesNodes = hiddenIndexPages.map<EditNodeModel>(ip => {
      const updatedToken = editedTokens.find(t => t.id === ip.tokenId)

      return {
        id: updatedToken?.id || ip.tokenId,
        droppable: false,
        text: updatedToken?.name || ip.title,
        parent: HIDDEN_INDEX_PAGES_ID,
        data: {
          type: ip.type,
        },
      }
    })

    if (
      editedIndexPagesNodes.length === 0 &&
      hiddenIndexPagesNodes.length === 0
    ) {
      return []
    }

    return [
      ...editedIndexPagesNodes,
      hiddenIndexPagesList,
      ...hiddenIndexPagesNodes,
    ].map(node => ({ ...node, droppable: true }))
  }, [editedIndexPages.items, editedTokens, hiddenIndexPages, readonly])

  const updateIndexPagesByTreeNodes = (nodes: EditNodeModel[]) => {
    const nodeWithoutHidden = nodes.filter(n => !isHiddenList(n.id.toString()))
    const indexPages = convertNodesToIndexPages(nodeWithoutHidden)

    updateIndexPages(indexPages)
  }

  const nextTokenId = useMemo(() => {
    const tokenIds = [...(fullTokens || []), ...addedTokens]?.map(
      t => +t.id.split('-')[1]
    )
    if (!tokenIds) return
    const tokenId = (tokenIds.length + 1).toString(16)

    const nextTokenId = `${nftId}-0x${tokenId}`
    return nextTokenId
  }, [addedTokens, fullTokens, nftId])

  const addEmptyIndexPage = () => {
    const newTokenId = `${nftId}-${Date.now()}`
    const newTitle = 'New Page'
    const newSlug = 'new-page'
    addIndexPage({
      tokenId: newTokenId,
      title: newTitle,
      slug: newSlug,
    })

    updateOrCreateAddedToken({
      id: newTokenId,
      name: newTitle,
      slug: newSlug,
      content: '',
    })
  }

  return {
    nft,
    fullTokens: fullTokens,
    loading:
      (loadingNft && !refetchingNft) ||
      (fullTokensLoading && !refetchingFullTokens),
    indexPages: nft?.indexPagesContent?.indexPages || [],
    hiddenIndexPages,
    nextTokenId,
    merge,
    mergeLoading,
    updateTokenName,
    treeData,
    updateIndexPagesByTreeNodes,
    addEmptyIndexPage,
  }
}

export default useEdit
