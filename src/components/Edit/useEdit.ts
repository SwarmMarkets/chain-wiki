import { Transaction, useStorageUpload } from '@thirdweb-dev/react'
import { useMemo, useState } from 'react'
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
import differenceWith from 'lodash/differenceWith'

const useEdit = () => {
  const { nftId = '' } = useParams()
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const {
    editedNft,
    editedTokens,
    editedIndexPages,
    initIndexPages,
    getEditedTokenById,
    updateOrCreateEditedToken,
    updateIndexPage,
    currEditableToken,
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
    return differenceWith(
      fullTokens,
      editedIndexPages.items,
      (a, b) => a.id === b.tokenId
    )
  }, [editedIndexPages.items, fullTokens])

  // console.log('hiddenIndexPages', hiddenIndexPages)

  const updateTokenName = (id: string, name: string) => {
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

    const indexPageToUpdate = editedIndexPages.items.find(
      p => p.tokenId === currEditableToken?.id
    )
    if (indexPageToUpdate) {
      updateIndexPage({ ...indexPageToUpdate, title: name })
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
    merge,
    mergeLoading,
    updateTokenName,
  }
}

export default useEdit
