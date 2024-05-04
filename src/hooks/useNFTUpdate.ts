import { useStorageUpload } from '@thirdweb-dev/react'
import { useCallback } from 'react'
import { useSX1155NFT } from './contracts/useSX1155NFT'
import useNFT from './subgraph/useNFT'
import { generateIpfsNftContent, unifyAddressToId } from '@src/shared/utils'
import { IpfsNftContent } from '@src/shared/types/ipfs'

export interface NFTContentToUpdate {
  logoUrl?: string | null
  name?: string | null
  uri?: string
  indexPagesUri?: string | null
}

const useNFTUpdate = (nftAddress: string) => {
  const {
    call,
    txLoading,
    result,
    isTxError,
    reset: resetCallState,
  } = useSX1155NFT(nftAddress)
  const {
    mutateAsync: upload,
    isLoading,
    isSuccess,
    isError,
    reset: resetStorageState,
  } = useStorageUpload()
  const { nft } = useNFT(nftAddress)

  const uploadContent = async (content: Partial<IpfsNftContent>) => {
    if (!nft || (nft.uri && !nft?.ipfsContent)) return
    const ipfsContent = generateIpfsNftContent({
      htmlContent: '',
      ...nft?.ipfsContent,
      ...content,
      address: unifyAddressToId(nft.id),
    })
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const signTransaction = useCallback(
    (nftContentToUpdate: NFTContentToUpdate) => {
      const nftUpdateJson = JSON.stringify(nftContentToUpdate)

      return call('setContractUri', [nftUpdateJson])
    },
    [call]
  )

  return {
    uploadContent,
    signTransaction,
    storageUpload: { isLoading, isSuccess, isError, resetStorageState },
    tx: { txLoading, isTxError, isSuccess: !!result, resetCallState },
  }
}

export default useNFTUpdate
