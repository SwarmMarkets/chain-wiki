import { BasicModalProps } from '@src/shared/types/common-props'
import Modal from '../ui/Modal'
import CreateNftForm from './CreateNftForm'
import useSteps from '@src/hooks/useSteps'
import { useTranslation } from 'react-i18next'
import SuccessContent from '../ui/SuccessScreens/SuccessContent'
import Box from '../ui/Box'

const CreateNftModal = ({ isOpen, onClose }: BasicModalProps) => {
  const { t } = useTranslation('nft')
  const { step, nextStep, reset } = useSteps(2)

  const handleOnClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnClose}
      maxWidth='500px'
      minHeight='250px'
      width='100%'
    >
      {step === 1 && (
        <CreateNftForm
          onSuccessSubmit={() => {
            console.log('success submit')
            nextStep()
          }}
        />
      )}

      {step === 2 && (
        <Box pt={3} minHeight='inherit'>
          <SuccessContent
            title={t('successCreateNft.title')}
            onClick={handleOnClose}
          />
        </Box>
      )}
    </Modal>
  )
}

export default CreateNftModal
