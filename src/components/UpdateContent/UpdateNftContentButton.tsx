import useModalState from '@src/hooks/useModalState'
import useNFTUpdate, { NFTContentToUpdate } from '@src/hooks/useNFTUpdate'
import { ChildrenProp } from '@src/shared/types/common-props'
import { MouseEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button, { ButtonProps } from '../ui/Button/Button'
import UpdateContentModal, { Steps } from './UpdateContentModal'
import { IpfsNftContent } from '@src/shared/types/ipfs'

interface UpdateNftContentButtonProps extends ButtonProps, ChildrenProp {
  nftAddress: string
  nftContentToUpdate?: NFTContentToUpdate
  ipfsNftToUpdate?: Partial<IpfsNftContent>
  onSuccess?(): void
  headerBackground?: string
}

const UpdateNftContentButton: React.FC<UpdateNftContentButtonProps> = ({
  nftAddress,
  nftContentToUpdate,
  ipfsNftToUpdate,
  onSuccess,
  children,
  ...buttonProps
}) => {
  const [ipfsUri, setIpfsUri] = useState('')
  const { t } = useTranslation('buttons')
  const { isOpen, open, close } = useModalState(false)

  const { uploadContent, signTransaction, tx, storageUpload } =
    useNFTUpdate(nftAddress)

  const startContentUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    open()
    let uri
    if (ipfsNftToUpdate?.htmlContent) {
      uri = await uploadContent(ipfsNftToUpdate)
      if (!uri) return

      setIpfsUri(uri)
    }

    const res = await signTransaction({
      ...nftContentToUpdate,
      ...(uri && { uri }),
    })

    if (res) {
      onSuccess?.()
      close()
      tx.resetCallState()
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
        loading: tx.txLoading,
        error: tx.isTxError,
        retry: () => signTransaction({ ...nftContentToUpdate, uri: ipfsUri }),
      },
    }
  }, [
    ipfsUri,
    nftContentToUpdate,
    signTransaction,
    storageUpload.isLoading,
    storageUpload.isSuccess,
    tx.isSuccess,
    tx.isTxError,
    tx.txLoading,
  ])

  const caption = children || t('updateContent')

  return (
    <>
      <UpdateContentModal
        contentType='nft'
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

export default UpdateNftContentButton
