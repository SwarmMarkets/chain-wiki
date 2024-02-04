import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import useModalState from '@src/hooks/useModalState'
import { generateIpfsProjectContent } from '@src/shared/utils/ipfs'
import { useStorageUpload } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button/Button'
import UpdateProjectContentModal from './UpdateProjectContentModal'

interface UpdateContentButtonProps {
  projectAddress: string
  content: string
}

const UpdateContentButton: React.FC<UpdateContentButtonProps> = ({ projectAddress, content }) => {
  const { t } = useTranslation('buttons')
  const { isOpen, open, close } = useModalState(false)
  const { call, txLoading, result } = useSX1155NFT(projectAddress)
  const { mutateAsync: upload, isLoading, isSuccess } = useStorageUpload()

  const uploadContent = async () => {
    const ipfsContent = generateIpfsProjectContent({
      name: projectAddress,
      address: projectAddress,
      htmlContent: content
    })
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const startContentUpdate = async () => {
    open()
    const uri = await uploadContent()
    if (uri) {
      call('setKya', [uri])
    }
  }

  return (
    <>
      <UpdateProjectContentModal
        steps={{
          0: { isSuccess: true, isLoading: false },
          1: { isSuccess: isSuccess, isLoading: isLoading },
          2: { isSuccess: !!result, isLoading: txLoading }
        }}
        isOpen={isOpen}
        onClose={close}
      />
      <Button mt={15} onClick={startContentUpdate}>
        {t('save')}
      </Button>
    </>
  )
}

export default UpdateContentButton
