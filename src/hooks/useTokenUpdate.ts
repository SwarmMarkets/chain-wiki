import { useCallback } from 'react'
import {
  generateIpfsTokenContent,
  IpfsTokenContent,
  IpfsVoteProposal,
} from 'src/shared/utils'
import { useIpfsUpload } from './web3/useIpfsUpload'
import useSX1155NFT from './contracts/nft/useSX1155NFT'
import useSendTx from './web3/useSendTx'

export interface TokenContentToUpdate {
  name?: string | null
  voteProposal?: IpfsVoteProposal
  ipfsContent?: IpfsTokenContent
  uri?: string
  voteProposalUri?: string
}
const useTokenUpdate = (nftAddress: string) => {
  const { sendTx, ...txParams } = useSendTx()
  const { prepareSetTokenKyaTx } = useSX1155NFT(nftAddress)
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
    const uri = (await upload(filesToUpload)) as string

    return uri
  }
  const uploadVoteProposal = async (voreProposal: IpfsVoteProposal) => {
    const filesToUpload = [JSON.stringify(voreProposal)]
    const uri = (await upload(filesToUpload)) as string

    return uri
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

      const tx = prepareSetTokenKyaTx({
        tokenId: BigInt(tokenId),
        Kya: tokenUpdateJson,
      })

      return sendTx(tx)
    },
    [prepareSetTokenKyaTx, sendTx]
  )

  return {
    uploadContent,
    uploadVoteProposal,
    signTransaction,
    storageUpload: { isLoading, isSuccess, resetStorageState },
    tx: txParams,
  }
}

export default useTokenUpdate
