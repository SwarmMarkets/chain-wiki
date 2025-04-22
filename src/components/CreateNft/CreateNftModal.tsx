import { BasicModalProps } from 'src/shared/types/common-props'
import Modal from '../ui-kit/Modal'
import CreateNftForm from './CreateNftForm'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const CreateNftModal = ({ isOpen, onClose }: BasicModalProps) => {
  const { t } = useTranslation('nft')

  const handleOnClose = () => {
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <CreateNftForm
        onSuccessSubmit={() => {
          toast(t('successCreateNft.title'), { type: 'success' })
          onClose()
        }}
        onErrorSubmit={e => toast(e.message, { type: 'error' })}
      />
    </Modal>
  )
}

export default CreateNftModal
