import { Transaction, useAddress, useStorageUpload } from '@thirdweb-dev/react'
import differenceWith from 'lodash/differenceWith'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSX1155NFT } from 'src/hooks/contracts/useSX1155NFT'
import useNFT from 'src/hooks/subgraph/useNFT'
import useTokens from 'src/hooks/subgraph/useTokens'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { useEditingStore } from 'src/shared/store/editing-store'
import {
  generateIpfsIndexPagesContent,
  resolveAllThirdwebTransactions,
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

const useEdit = (readonly?: boolean) => {
  const { nftId = '' } = useParams()
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })
  const account = useAddress()

  const {
    editedNft,
    editedTokens,
    addedTokens,
    editedIndexPages,
    initIndexPages,
    getEditedTokenById,
    updateOrCreateEditedToken,
    updateOrCreateAddedToken,
    updateIndexPage,
    updateIndexPages,
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

  const { smartAccount } = useSmartAccount()
  const { mutateAsync: upload } = useStorageUpload()
  const [mergeLoading, setMergeLoading] = useState(false)

  const { contract: sx1555NFTContract } = useSX1155NFT(nftId)
  const { uploadContent } = useNFTUpdate(nftId)
  const { uploadContent: uploadTokenContent } = useTokenUpdate(nftId)

  const merge = async () => {
    setMergeLoading(true)
    const txs: Transaction[] = []
    try {
      if (editedNft) {
        const ipfsUri = await uploadContent({
          address: nftId,
          htmlContent: editedNft.content,
        })
        if (ipfsUri) {
          const nftContentUpdateTx = sx1555NFTContract.prepare('setKya', [
            JSON.stringify({ uri: ipfsUri, name: editedNft.name }),
          ])
          txs.push(nftContentUpdateTx)
        }
      }
      if (editedTokens.length > 0) {
        for (const editedToken of editedTokens) {
          const tokenId = +editedToken.id.split('-')[1]
          const firstUri = await uploadTokenContent(tokenId, {
            htmlContent: editedToken.content,
            address: nftId,
            tokenId,
          })
          if (firstUri) {
            const tokenContentUpdateTx = sx1555NFTContract.prepare(
              'setTokenKya',
              [
                tokenId,
                JSON.stringify({ uri: firstUri, name: editedToken.name }),
                editedToken.slug,
              ]
            )
            txs.push(tokenContentUpdateTx)
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
          if (firstUri && account) {
            const tokenContentMintTx = sx1555NFTContract.prepare('mint', [
              account,
              1,
              JSON.stringify({ uri: firstUri, name: addedToken.name }),
              addedToken.slug,
            ])
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
        const uris = await upload({ data: filesToUpload })
        const firstUri = uris[0]
        if (firstUri) {
          const tokenContentUpdateTx = sx1555NFTContract.prepare('setKya', [
            JSON.stringify({ indexPagesUri: firstUri }),
          ])
          txs.push(tokenContentUpdateTx)
        }
      }

      const receipt = await smartAccount?.send({
        transactions: await resolveAllThirdwebTransactions(txs),
      })

      if (receipt?.status == SafeClientTxStatus.EXECUTED) {
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
    const tokenId = tokenIds.length.toString(16)

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
