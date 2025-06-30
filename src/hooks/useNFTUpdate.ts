import { useCallback } from 'react'
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
import { useIpfsUpload } from './web3/useIpfsUpload'
import useSX1155NFT from './contracts/nft/useSX1155NFT'
import useSendTx from './web3/useSendTx'

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
  const { prepareSetContractKyaTx } = useSX1155NFT(nftAddress)
  const {
    mutateAsync: upload,
    isLoading,
    isSuccess,
    isError,
    reset: resetStorageState,
  } = useIpfsUpload()
  const { sendTx, ...txParams } = useSendTx()

  const uploadContent = async (content: Partial<IpfsNftContent>) => {
    if (content.htmlContent === undefined) return
    const ipfsContent = generateIpfsNftContent({
      htmlContent: content.htmlContent,
      address: unifyAddressToId(nftAddress),
    })
    const filesToUpload = [ipfsContent]
    const uri = (await upload(filesToUpload)) as string
    return uri
  }

  const uploadIndexPagesContent = async (indexPages: IpfsIndexPage[]) => {
    const ipfsIndexPagesContent = generateIpfsIndexPagesContent({
      indexPages: indexPages,
      address: unifyAddressToId(nftAddress),
    })
    const filesToUpload = [ipfsIndexPagesContent]
    const uri = (await upload(filesToUpload)) as string

    return uri
  }

  const uploadHeaderLinksContent = async (
    headerLinksContent: Partial<IpfsHeaderLinksContent>
  ) => {
    const ipfsHeaderLinksContent = generateIpfsHeaderLinksContent({
      headerLinks: headerLinksContent.headerLinks || [],
      address: nftAddress,
      color: headerLinksContent.color || '#000000',
    })
    const filesToUpload = [ipfsHeaderLinksContent]
    const uri = (await upload(filesToUpload)) as string

    return uri
  }

  const signTransaction = useCallback(
    (nftContentToUpdate: NFTContentToUpdate) => {
      const nftUpdateJson = JSON.stringify(nftContentToUpdate)

      const tx = prepareSetContractKyaTx({ Kya: nftUpdateJson })

      return sendTx(tx)
    },
    [prepareSetContractKyaTx, sendTx]
  )

  return {
    uploadContent,
    uploadIndexPagesContent,
    uploadHeaderLinksContent,
    signTransaction,
    storageUpload: { isLoading, isSuccess, isError, resetStorageState },
    tx: txParams,
  }
}

export default useNFTUpdate
