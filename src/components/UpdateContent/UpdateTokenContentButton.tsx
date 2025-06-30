import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useToken from 'src/hooks/subgraph/useToken'
import useModalState from 'src/hooks/useModalState'
import useTokenUpdate, { TokenContentToUpdate } from 'src/hooks/useTokenUpdate'
import { ChildrenProp } from 'src/shared/types/common-props'
import Button, { ButtonProps } from '../ui/Button/Button'
import UpdateContentModal, { Steps } from './UpdateContentModal'

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
  const [ipfsUri, setIpfsUri] = useState('')
  const [voteProposalUri, setVoteProposalUri] = useState('')
  const { t } = useTranslation('buttons')
  const { isOpen, open, close } = useModalState(false)

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

      setIpfsUri(uri)
    }
    let voteProposalUri
    if (tokenContentToUpdate.voteProposal) {
      voteProposalUri = await uploadVoteProposal(
        tokenContentToUpdate.voteProposal
      )
      if (!voteProposalUri) return

      setVoteProposalUri(voteProposalUri)
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

  const steps = useMemo(() => {
    return {
      [Steps.PrepareContent]: { success: true, loading: false },
      [Steps.UploadToIPFS]: {
        success: storageUpload.isSuccess,
        loading: storageUpload.isLoading,
      },
      [Steps.SignTransaction]: {
        success: tx.isSuccess,
        loading: tx.isPending,
        error: tx.isError,
        retry: () =>
          signTransaction(tokenId, {
            ...tokenContentToUpdate,
            uri: ipfsUri,
            voteProposalUri,
          }),
      },
    }
  }, [
    ipfsUri,
    signTransaction,
    storageUpload.isLoading,
    storageUpload.isSuccess,
    tokenContentToUpdate,
    tokenId,
    tx.isError,
    tx.isPending,
    tx.isSuccess,
    voteProposalUri,
  ])

  const caption = children || t('updateContent')

  return (
    <>
      <UpdateContentModal
        contentType='token'
        steps={steps}
        isOpen={isOpen}
        onClose={close}
      />
      <Button onClick={startContentUpdate} {...buttonProps}>
        {caption}
      </Button>
    </>
  )
}

export default UpdateTokenContentButton
