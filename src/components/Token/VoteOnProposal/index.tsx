import Button, { ButtonProps } from 'src/components/ui/Button/Button'
import useModalState from 'src/hooks/useModalState'
import { useTranslation } from 'react-i18next'
import VoteOnProposalModal from './VoteOnProposalModal'
import useSteps from 'src/hooks/useSteps'
import SuccessModal from 'src/components/ui/SuccessScreens/SuccessModal'

const VoteOnProposalButton: React.FC<ButtonProps> = props => {
  const { t } = useTranslation('token')

  const { step, nextStep, reset } = useSteps(2)
  const { isOpen, open, close } = useModalState(false)

  const handleFinishVoting = () => {
    reset()
    close()
  }

  return (
    <>
      <Button onClick={open} {...props}>
        {t('vote')}
      </Button>

      {step === 1 && (
        <VoteOnProposalModal
          isOpen={isOpen}
          onClose={close}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <SuccessModal
          isOpen
          onClose={handleFinishVoting}
          title={t('successVote.title')}
        />
      )}
    </>
  )
}

export default VoteOnProposalButton
