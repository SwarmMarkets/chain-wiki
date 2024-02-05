import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import useModalState from '@src/hooks/useModalState'
import { generateIpfsProjectContent } from '@src/shared/utils/ipfs'
import { useStorageUpload } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button/Button'
import UpdateProjectContentModal, { Steps } from './UpdateProjectContentModal'
import { useCallback, useMemo, useState } from 'react'

interface UpdateContentButtonProps {
  projectAddress: string
  content: string
}

const UpdateContentButton: React.FC<UpdateContentButtonProps> = ({
  projectAddress,
  content,
}) => {
  const [ipfsUri, setIpfsUri] = useState('')
  const { t } = useTranslation('buttons')
  const { isOpen, open, close } = useModalState(false)

  const { call, txLoading, result, isTxError } = useSX1155NFT(projectAddress)
  const { mutateAsync: upload, isLoading, isSuccess } = useStorageUpload()

  const uploadContent = async () => {
    const ipfsContent = generateIpfsProjectContent({
      name: projectAddress,
      address: projectAddress,
      htmlContent: content,
    })
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const signTransaction = useCallback(
    (uri: string) => {
      call('setKya', [uri])
    },
    [call]
  )

  const startContentUpdate = async () => {
    open()
    const uri = await uploadContent()
    setIpfsUri(uri)
    if (uri) signTransaction(uri)
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

  return (
    <>
      <UpdateProjectContentModal
        steps={steps}
        isOpen={isOpen}
        onClose={close}
      />
      <Button mt={15} onClick={startContentUpdate}>
        {t('updateContent')}
      </Button>
    </>
  )
}

export default UpdateContentButton
