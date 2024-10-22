import { useStorageUpload } from '@thirdweb-dev/react'
import { useCallback } from 'react'
import { useSX1155NFT } from './contracts/useSX1155NFT'
import useNFT from './subgraph/useNFT'
import {
  generateIpfsHeaderLinksContent,
  generateIpfsIndexPagesContent,
  generateIpfsNftContent,
  unifyAddressToId,
} from '@src/shared/utils'
import {
  IpfsHeaderLink,
  IpfsIndexPage,
  IpfsNftContent,
} from '@src/shared/utils/ipfs/types'

export interface NFTContentToUpdate {
  logoUrl?: string | null
  headerBackground?: string | null
  name?: string | null
  uri?: string
  indexPagesUri?: string | null
  headerLinksUri?: string | null
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
    if (!nft || content.htmlContent === undefined) return
    const ipfsContent = generateIpfsNftContent({
      htmlContent: content.htmlContent,
      address: unifyAddressToId(nft.id),
    })
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const uploadIndexPagesContent = async (indexPages: IpfsIndexPage[]) => {
    if (!nft) return
    const ipfsIndexPagesContent = generateIpfsIndexPagesContent({
      indexPages: indexPages,
      address: unifyAddressToId(nft.id),
    })
    const filesToUpload = [ipfsIndexPagesContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }
  const uploadHeaderLinksContent = async (headerLinks: IpfsHeaderLink[]) => {
    if (!nft) return
    const ipfsHeaderLinksContent = generateIpfsHeaderLinksContent({
      headerLinks: headerLinks,
      address: unifyAddressToId(nft.id),
    })
    const filesToUpload = [ipfsHeaderLinksContent]
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
    uploadIndexPagesContent,
    uploadHeaderLinksContent,
    signTransaction,
    storageUpload: { isLoading, isSuccess, isError, resetStorageState },
    tx: { txLoading, isTxError, isSuccess: !!result, resetCallState },
  }
}

export default useNFTUpdate
