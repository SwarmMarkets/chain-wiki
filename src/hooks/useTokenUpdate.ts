import { useCallback } from 'react'
import {
  generateIpfsTokenContent,
  IpfsTokenContent,
  IpfsVoteProposal,
} from 'src/shared/utils'
import { useSX1155NFT } from './contracts/useSX1155NFT'
import { useIpfsUpload } from './web3/useIpfsUpload'

export interface TokenContentToUpdate {
  name?: string | null
  voteProposal?: IpfsVoteProposal
  ipfsContent?: IpfsTokenContent
  uri?: string
  voteProposalUri?: string
}
const useTokenUpdate = (nftAddress: string) => {
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
    reset: resetStorageState,
  } = useIpfsUpload()

  const uploadContent = async (
    tokenId: number,
    content: Partial<IpfsTokenContent>
  ) => {
    const contentToGenerate = {
      address: nftAddress,
      tokenId,
      htmlContent: content.htmlContent || '',
    }

    const ipfsContent = generateIpfsTokenContent(contentToGenerate)
    const filesToUpload = [ipfsContent]
    const uris = await upload(filesToUpload)
    const firstUri = uris[0]

    return firstUri
  }
  const uploadVoteProposal = async (voreProposal: IpfsVoteProposal) => {
    const filesToUpload = [JSON.stringify(voreProposal)]
    const uris = await upload(filesToUpload)
    const firstUri = uris[0]
    return firstUri
  }

  const signTransaction = useCallback(
    (tokenId: number, tokenContentToUpdate: TokenContentToUpdate) => {
      const { name, uri, voteProposalUri } = tokenContentToUpdate
      const tokenUpdate = {
        name,
        ...(uri && { uri }),
        ...(voteProposalUri && { voteProposalUri }),
      }

      const tokenUpdateJson = JSON.stringify(tokenUpdate)

      return call('setTokenKya', [tokenId, tokenUpdateJson])
    },
    [call]
  )

  return {
    uploadContent,
    uploadVoteProposal,
    signTransaction,
    storageUpload: { isLoading, isSuccess, resetStorageState },
    tx: { txLoading, isTxError, isSuccess: !!result, resetCallState },
  }
}

export default useTokenUpdate
