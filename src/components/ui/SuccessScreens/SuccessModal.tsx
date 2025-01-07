import { BasicModalProps } from 'src/shared/types/common-props'
import Modal from '../../ui/Modal'
import SuccessContent from './SuccessContent'
import Box from '../Box'

export type ContentType = 'nft' | 'token'

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
      minHeight='240px'
      pt={4}
      width='100%'
    >
      <Box minHeight='inherit'>
        <SuccessContent
          title={title}
          description={description}
          onClick={onClose}
        />
      </Box>
    </Modal>
  )
}

export default SuccessModal
