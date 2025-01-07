import useModalState from 'src/hooks/useModalState'
import useNFTUpdate, { NFTContentToUpdate } from 'src/hooks/useNFTUpdate'
import { ChildrenProp } from 'src/shared/types/common-props'
import {
  IpfsHeaderLinksContent,
  IpfsIndexPage,
  IpfsNftContent,
} from 'src/shared/utils/ipfs/types'
import { MouseEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button, { ButtonProps } from '../ui/Button/Button'
import UpdateContentModal, { Steps } from './UpdateContentModal'

interface UpdateNftContentButtonProps extends ButtonProps, ChildrenProp {
  nftAddress: string
  nftContentToUpdate?: NFTContentToUpdate
  ipfsNftToUpdate?: Partial<IpfsNftContent>
  ipfsIndexPagesToUpdate?: IpfsIndexPage[]
  ipfsHeaderLinkToUpdate?: Partial<IpfsHeaderLinksContent> // [id, link, title] color
  onSuccess?(): void
}

const UpdateNftContentButton: React.FC<UpdateNftContentButtonProps> = ({
  nftAddress,
  nftContentToUpdate,
  ipfsNftToUpdate,
  ipfsIndexPagesToUpdate,
  ipfsHeaderLinkToUpdate,
  onSuccess,
  children,
  ...buttonProps
}) => {
  const [ipfsUri, setIpfsUri] = useState('')
  const [indexPagesUri, setIndexPagesUri] = useState('')
  const [headerLinksUri, setHeaderLinksUri] = useState('')
  const { t } = useTranslation('buttons')
  const { isOpen, open, close } = useModalState(false)

  const {
    uploadContent,
    uploadIndexPagesContent,
    uploadHeaderLinksContent,
    signTransaction,
    tx,
    storageUpload,
  } = useNFTUpdate(nftAddress)

  const startContentUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    open()

    let uri
    if (ipfsNftToUpdate?.htmlContent) {
      uri = await uploadContent(ipfsNftToUpdate)

      if (uri) {
        setIpfsUri(uri)
      }
    }

    let indexPagesUri
    if (ipfsIndexPagesToUpdate) {
      indexPagesUri = await uploadIndexPagesContent(ipfsIndexPagesToUpdate)

      if (indexPagesUri) {
        setIndexPagesUri(indexPagesUri)
      }
    }

    let headerLinksUri
    if (ipfsHeaderLinkToUpdate) {
      headerLinksUri = await uploadHeaderLinksContent(ipfsHeaderLinkToUpdate)

      if (headerLinksUri) {
        setHeaderLinksUri(headerLinksUri)
      }
    }

    const res = await signTransaction({
      ...nftContentToUpdate,
      ...(uri && { uri }),
      ...(indexPagesUri && { indexPagesUri }),
      ...(headerLinksUri && { headerLinksUri }),
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
        retry: () =>
          signTransaction({
            ...nftContentToUpdate,
            uri: ipfsUri,
            indexPagesUri,
            headerLinksUri,
          }),
      },
    }
  }, [
    indexPagesUri,
    ipfsUri,
    headerLinksUri,
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
