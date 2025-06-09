import { useStorageUpload } from '@thirdweb-dev/react'
import { useCallback } from 'react'
import { useSX1155NFT } from './contracts/useSX1155NFT'
import {
  generateIpfsHeaderLinksContent,
  generateIpfsIndexPagesContent,
  generateIpfsNftContent,
  unifyAddressToId,
} from 'src/shared/utils'
import {
  IpfsHeaderLinksContent,
  IpfsIndexPage,
  IpfsNftContent,
} from 'src/shared/utils/ipfs/types'

export interface NFTContentToUpdate {
  logoUrl?: string | null
  iconLogoUrl?: string | null
  headerBackground?: string | null
  name?: string | null
  uri?: string
  indexPagesUri?: string | null
  headerLinksUri?: string | null
  preferredAttestatorToAdd?: string
  preferredAttestatorToRemove?: string
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
  // const { nft } = useNFT(nftAddress)

  const uploadContent = async (content: Partial<IpfsNftContent>) => {
    if (content.htmlContent === undefined) return
    const ipfsContent = generateIpfsNftContent({
      htmlContent: content.htmlContent,
      address: unifyAddressToId(nftAddress),
    })
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const uploadIndexPagesContent = async (indexPages: IpfsIndexPage[]) => {
    // if (!nft.id) return
    const ipfsIndexPagesContent = generateIpfsIndexPagesContent({
      indexPages: indexPages,
      address: unifyAddressToId(nftAddress),
    })
    const filesToUpload = [ipfsIndexPagesContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const uploadHeaderLinksContent = async (
    headerLinksContent: Partial<IpfsHeaderLinksContent>
  ) => {
    // if (!nft.id) return
    const ipfsHeaderLinksContent = generateIpfsHeaderLinksContent({
      headerLinks:
        headerLinksContent.headerLinks ||
        // nft.headerLinksContent?.headerLinks ||
        [],
      address: nftAddress,
      color: headerLinksContent.color || '#000000',
    })
    const filesToUpload = [ipfsHeaderLinksContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const signTransaction = useCallback(
    (nftContentToUpdate: NFTContentToUpdate) => {
      const nftUpdateJson = JSON.stringify(nftContentToUpdate)

      return call('setContractKya', [nftUpdateJson])
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
