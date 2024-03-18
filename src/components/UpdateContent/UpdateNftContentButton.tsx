import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import useModalState from '@src/hooks/useModalState'
import { IpfsNftContent } from '@src/shared/types/ipfs'
import { generateIpfsNftContent } from '@src/shared/utils/ipfs'
import { useStorageUpload } from '@thirdweb-dev/react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button, { ButtonProps } from '../ui/Button/Button'
import UpdateContentModal, { Steps } from './UpdateContentModal'
import { ChildrenProp } from '@src/shared/types/common-props'
import useNFT from '@src/hooks/subgraph/useNFT'

interface UpdateNftContentButtonProps extends ButtonProps, ChildrenProp {
  nftAddress: string
  nftContentToUpdate: Partial<IpfsNftContent>
  onSuccess?(): void
}

const UpdateNftContentButton: React.FC<UpdateNftContentButtonProps> = ({
  nftAddress,
  nftContentToUpdate,
  onSuccess,
  children,
  ...buttonProps
}) => {
  const [ipfsUri, setIpfsUri] = useState('')
  const { t } = useTranslation('buttons')
  const { isOpen, open, close } = useModalState(false)

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
  } = useStorageUpload()
  const { nft } = useNFT(nftAddress)

  const uploadContent = async () => {
    if (!nft) return
    const ipfsContent = generateIpfsNftContent({
      htmlContent: '',
      ...nft?.ipfsContent,
      ...nftContentToUpdate,
      name: nft.name,
      address: nft.id,
    })
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const signTransaction = useCallback(
    (uri: string) => {
      return call('setContractUri', [uri])
    },
    [call]
  )

  const startContentUpdate = async () => {
    open()
    const uri = await uploadContent()
    if (!uri) return

    setIpfsUri(uri)

    const res = await signTransaction(uri)

    if (res) {
      onSuccess?.()
      close()
      resetCallState()
      resetStorageState()
    }
  }

  const steps = useMemo(() => {
    return {
      [Steps.PrepareContent]: { success: true, loading: false },
      [Steps.UploadToIPFS]: { success: isSuccess, loading: isLoading },
      [Steps.SignTransaction]: {
        success: !!result,
        loading: txLoading,
        error: isTxError,
        retry: () => signTransaction(ipfsUri),
      },
    }
  }, [
    ipfsUri,
    isLoading,
    isSuccess,
    isTxError,
    result,
    signTransaction,
    txLoading,
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
