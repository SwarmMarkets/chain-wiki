import differenceWith from 'lodash/differenceWith'
import React, { useEffect, useMemo, useState } from 'react'
import useNFT from 'src/hooks/subgraph/useNFT'
import useTokens from 'src/hooks/subgraph/useTokens'
import { useEditingStore } from 'src/shared/store/editing-store'
import {
  generateIpfsIndexPagesContent,
  isSameEthereumAddress,
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
import useTokenUpdate from 'src/hooks/useTokenUpdate'
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import { useActiveAccount } from 'thirdweb/react'
import { PreparedTransaction } from 'thirdweb'
import { useIpfsUpload } from 'src/hooks/web3/useIpfsUpload'
import useSX1155NFT from 'src/hooks/contracts/nft/useSX1155NFT'
import useSendBatchTxs from 'src/hooks/web3/useSendBatchTxs'

const useEdit = (readonly?: boolean) => {
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
      variables: { filter: { nft: unifyAddressToId(nftId) }, limit: 100 },
    },
    { fetchFullData: true }
  )

  const { mutateAsync: upload } = useIpfsUpload()

  // Init the first editable token
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
    prepareMintTx,
    prepareSetTokenKyaTx,
    prepareUpdateTokenSlugTx,
    prepareSetContractKyaTx,
  } = useSX1155NFT(nftId)
  const { uploadContent: uploadTokenContent } = useTokenUpdate(nftId)

  const merge = async () => {
    setMergeLoading(true)
    const txs: PreparedTransaction[] = []
    try {
      if (editedTokens.length > 0) {
        for (const editedToken of editedTokens) {
          const tokenId = +editedToken.id.split('-')[1]
          const firstUri = await uploadTokenContent(tokenId, {
            htmlContent: editedToken.content,
            address: nftId,
            tokenId,
          })
          if (firstUri) {
            const tokenContentUpdateTx = prepareSetTokenKyaTx({
              tokenId: BigInt(tokenId),
              Kya: JSON.stringify({ uri: firstUri, name: editedToken.name }),
            })
            txs.push(tokenContentUpdateTx)

            const slugIsEdited =
              fullTokens?.find(t => t.id === editedToken.id)?.slug !==
              editedToken.slug

            if (slugIsEdited) {
              const tokenSlugUpdateTx = prepareUpdateTokenSlugTx({
                tokenId: BigInt(tokenId),
                slug: editedToken.slug,
              })
              txs.push(tokenSlugUpdateTx)
            }
          }
        }
      }
      if (addedTokens.length > 0) {
        for (const addedToken of addedTokens) {
          const tokenId = +addedToken.id.split('-')[1]
          const firstUri = await uploadTokenContent(tokenId, {
            htmlContent: addedToken.content,
            address: nftId,
            tokenId,
          })
          if (firstUri && account?.address) {
            const tokenContentMintTx = prepareMintTx({
              to: account.address,
              quantity: 1n,
              tokenURI: JSON.stringify({
                uri: firstUri,
                name: addedToken.name,
              }),
              slug: addedToken.slug,
            })
            txs.push(tokenContentMintTx)
          }
        }
      }
      if (editedIndexPages.isEdited) {
        const indexPagesIpfsContent = generateIpfsIndexPagesContent({
          indexPages: editedIndexPages.items,
          address: nftId,
        })
        const filesToUpload = [indexPagesIpfsContent]
        const uris = await upload(filesToUpload)
        const firstUri = uris[0]
        if (firstUri) {
          const tokenContentUpdateTx = prepareSetContractKyaTx({
            Kya: JSON.stringify({ indexPagesUri: firstUri }),
          })
          txs.push(tokenContentUpdateTx)
        }
      }

      const receipt = await sendBatchTxs(txs)

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
      text: 'Hidden index pages',
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
