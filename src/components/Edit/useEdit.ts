import { NodeModel } from '@minoru/react-dnd-treeview'
import { Transaction, useAddress, useStorageUpload } from '@thirdweb-dev/react'
import differenceWith from 'lodash/differenceWith'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSX1155NFT } from 'src/hooks/contracts/useSX1155NFT'
import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import useNFT from 'src/hooks/subgraph/useNFT'
import useTokens from 'src/hooks/subgraph/useTokens'
import useEffectCompare from 'src/hooks/useEffectCompare'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { useEditingStore } from 'src/shared/store/editing-store'
import {
  generateIpfsIndexPagesContent,
  generateIpfsTokenContent,
  resolveAllThirdwebTransactions,
  unifyAddressToId,
} from 'src/shared/utils'
import {
  convertIndexPagesToNodes,
  convertNodesToIndexPages,
  convertTokensToIndexPages,
} from './utils'

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
  } = useEditingStore()

  const { indexPages = [] } = useIpfsIndexPages(nft?.indexPagesUri)

  useEffectCompare(() => {
    if (indexPages.length > 0) {
      initIndexPages(indexPages)
    }
  }, [indexPages])

  const {
    fullTokens,
    loading: fullTokensLoading,
    refetching: refetchingFullTokens,
  } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(nftId) } },
    },
    { fetchFullData: true }
  )

  const { smartAccount } = useSmartAccount()
  const { mutateAsync: upload } = useStorageUpload()
  const [mergeLoading, setMergeLoading] = useState(false)

  const { contract: sx1555NFTContract } = useSX1155NFT(nftId)
  const { uploadContent } = useNFTUpdate(nftId)

  // console.log('editedNft', editedNft)
  // console.log('editedTokens', editedTokens)
  // console.log('editedIndexPages', editedIndexPages)
  const merge = async () => {
    setMergeLoading(true)
    console.log(editedTokens, 'editedTokens')
    const txs: Transaction[] = []
    try {
      if (editedNft) {
        const ipfsUri = await uploadContent({
          address: nftId,
          htmlContent: editedNft.content,
        })
        if (ipfsUri) {
          const nftContentUpdateTx = sx1555NFTContract.prepare(
            'setContractUri',
            [JSON.stringify({ uri: ipfsUri, name: editedNft.name })]
          )
          txs.push(nftContentUpdateTx)
        }
      }
      if (editedTokens.length > 0) {
        for (const editedToken of editedTokens) {
          const tokenId = +editedToken.id.split('-')[1]
          const ipfsContent = generateIpfsTokenContent({
            tokenId,
            htmlContent: editedToken.content,
            address: nftId,
          })
          const filesToUpload = [ipfsContent]
          const uris = await upload({ data: filesToUpload })
          const firstUri = uris[0]
          if (firstUri) {
            const tokenContentUpdateTx = sx1555NFTContract.prepare(
              'setTokenUri',
              [
                tokenId,
                JSON.stringify({ uri: firstUri, name: editedToken.name }),
              ]
            )
            txs.push(tokenContentUpdateTx)
          }
        }
      }
      if (addedTokens.length > 0) {
        for (const addedToken of addedTokens) {
          const tokenId = +addedToken.id.split('-')[1]
          const ipfsContent = generateIpfsTokenContent({
            tokenId,
            htmlContent: addedToken.content,
            address: nftId,
          })
          const filesToUpload = [ipfsContent]
          const uris = await upload({ data: filesToUpload })
          const firstUri = uris[0]
          if (firstUri && account) {
            const tokenContentMintTx = sx1555NFTContract.prepare('mint', [
              account,
              1,
              JSON.stringify({ uri: firstUri, name: addedToken.name }),
              '0x',
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
          const tokenContentUpdateTx = sx1555NFTContract.prepare(
            'setContractUri',
            [JSON.stringify({ indexPagesUri: firstUri })]
          )
          txs.push(tokenContentUpdateTx)
        }
      }
      console.log(txs)

      const receipt = await smartAccount?.send({
        transactions: await resolveAllThirdwebTransactions(txs),
      })

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

  const updateTokenName = (id: string, name: string) => {
    const addedToken = addedTokens.find(t => t.id === id)

    if (addedToken) {
      updateOrCreateAddedToken({
        ...addedToken,
        name,
      })
    } else {
      const token = fullTokens?.find(t => t.id === id)
      const editedToken = getEditedTokenById(id)

      if (token) {
        const content =
          editedToken?.content || token.ipfsContent?.htmlContent || ''

        updateOrCreateEditedToken({
          id: token.id,
          name,
          content,
        })
      }
    }

    const indexPageToUpdate = editedIndexPages.items.find(p => p.tokenId === id)

    if (indexPageToUpdate) {
      updateIndexPage({ ...indexPageToUpdate, title: name })
    }
  }

  const treeData = React.useMemo<NodeModel[]>(() => {
    const editedIndexPagesNodes = convertIndexPagesToNodes(
      editedIndexPages.items
    )

    if (readonly) {
      return editedIndexPagesNodes
    }

    const hiddenIndexPagesList: NodeModel = {
      id: 'hiddenIndexPages',
      droppable: true,
      text: 'Hidden index pages',
      parent: 0,
    }
    const hiddenIndexPagesNodes = hiddenIndexPages.map<NodeModel>(ip => {
      const updatedToken = editedTokens.find(t => t.id === ip.tokenId)

      return {
        id: updatedToken?.id || ip.tokenId,
        droppable: false,
        text: updatedToken?.name || ip.title,
        parent: 'hiddenIndexPages',
      }
    })

    return [
      ...editedIndexPagesNodes,
      hiddenIndexPagesList,
      ...hiddenIndexPagesNodes,
    ].map(node => ({ ...node, droppable: true }))
  }, [editedIndexPages.items, editedTokens, hiddenIndexPages, readonly])

  const updateIndexPagesByTreeNodes = (nodes: NodeModel[]) => {
    const nodeWithoutHidden = nodes.filter(
      n => n.id !== 'hiddenIndexPages' && n.parent !== 'hiddenIndexPages'
    )
    const indexPages = convertNodesToIndexPages(nodeWithoutHidden)

    updateIndexPages(indexPages)
  }

  const nextTokenId = useMemo(() => {
    console.log(addedTokens)
    const tokenIds = [...(fullTokens || []), ...addedTokens]?.map(
      t => +t.id.split('-')[1]
    )
    if (!tokenIds) return
    const nextTokenId = `${nftId}-0x${(Math.max(...tokenIds) + 1).toString(16)}`
    return nextTokenId
  }, [addedTokens, fullTokens, nftId])

  const addEmptyIndexPage = () => {
    if (nextTokenId) {
      addIndexPage({ tokenId: nextTokenId, title: 'Page' })
    }
  }

  return {
    nft,
    fullTokens: fullTokens,
    loading:
      loadingNft &&
      fullTokensLoading &&
      !refetchingFullTokens &&
      !refetchingNft,
    indexPages,
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
