import { BasicModalProps } from '@src/shared/types/common-props'
import Modal from '../../ui/Modal'
import SuccessContent from './SuccessContent'

export type ContentType = 'project' | 'article'

interface SuccessModalProps extends BasicModalProps {
  title?: string
  description?: string
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  title = 'Success',
  description = '',
  onClose,
  isOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth='500px'
      minHeight='200px'
      width='100%'
    >
      <SuccessContent
        title={title}
        description={description}
        onClick={onClose}
      />
    </Modal>
  )
}

export default SuccessModal
