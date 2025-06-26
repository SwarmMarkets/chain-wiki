import { BasicModalProps } from 'src/shared/types/common-props'
import Modal from '../ui-kit/Modal'
import CreateNftForm from './CreateNftForm'
import { useTranslation } from 'react-i18next'

const CreateNftModal = ({ isOpen, onClose }: BasicModalProps) => {
  const { t } = useTranslation('nft')

  const handleOnClose = () => {
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <CreateNftForm onSuccessSubmit={onClose} />
    </Modal>
  )
}

export default CreateNftModal
