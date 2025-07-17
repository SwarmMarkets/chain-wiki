import { useTranslation } from 'react-i18next'
import useToken from 'src/hooks/subgraph/useToken'
import useTokenUpdate, { TokenContentToUpdate } from 'src/hooks/useTokenUpdate'
import { ChildrenProp } from 'src/shared/types/common-props'
import Button, { ButtonProps } from '../ui-kit/Button/Button'

interface UpdateTokenContentButtonProps extends ButtonProps, ChildrenProp {
  tokenAddress: string
  nftAddress: string
  tokenContentToUpdate: TokenContentToUpdate
  onSuccess?(): void
}

const UpdateTokenContentButton: React.FC<UpdateTokenContentButtonProps> = ({
  tokenAddress,
  nftAddress,
  tokenContentToUpdate,
  onSuccess,
  children,
  ...buttonProps
}) => {
  const { t } = useTranslation('buttons')

  const { token } = useToken(tokenAddress)
  const tokenId = Number(token?.id.split('-')[1])

  const {
    uploadContent,
    uploadVoteProposal,
    signTransaction,
    tx,
    storageUpload,
  } = useTokenUpdate(nftAddress)

  const startContentUpdate = async () => {
    open()
    let uri
    if (tokenContentToUpdate.ipfsContent) {
      uri = await uploadContent(tokenId, tokenContentToUpdate.ipfsContent)
      if (!uri) return
    }
    let voteProposalUri
    if (tokenContentToUpdate.voteProposal) {
      voteProposalUri = await uploadVoteProposal(
        tokenContentToUpdate.voteProposal
      )
      if (!voteProposalUri) return
    }
    const res = await signTransaction(tokenId, {
      ...tokenContentToUpdate,
      uri,
      voteProposalUri,
    })

    if (res) {
      onSuccess?.()
      close()
      storageUpload.resetStorageState()
    }
  }

  const caption = children || t('updateContent')

  return (
    <>
      <Button
        loading={tx.isPending || storageUpload.isLoading}
        onClick={startContentUpdate}
        {...buttonProps}
      >
        {caption}
      </Button>
    </>
  )
}

export default UpdateTokenContentButton
