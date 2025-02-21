import Modal from 'src/components/ui-kit/Modal'
import SuccessContent from 'src/components/ui/SuccessScreens/SuccessContent'
import useSteps from 'src/hooks/useSteps'
import { BasicModalProps } from 'src/shared/types/common-props'
import { VoteProposal } from 'src/shared/types/vote-proposal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReviewVoteProposal from './ReviewVoteProposal'
import UploadVoteProposal from './UploadVoteProposal'
import Box from 'src/components/ui/Box'

const UploadVoteProposalModal: React.FC<BasicModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('token')

  const { step, nextStep, backStep, reset } = useSteps(3)
  const [voteProposal, setVoteProposal] = useState<VoteProposal>()

  const handleUploadVoteProposal = (value: VoteProposal) => {
    setVoteProposal(value)
  }


  const handleOnClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      {step === 1 && (
        <UploadVoteProposal
          nextStep={nextStep}
          onUploadVoteProposal={handleUploadVoteProposal}
        />
      )}
      {step === 2 && (
        <ReviewVoteProposal
          backStep={backStep}
          nextStep={nextStep}
          voteProposal={voteProposal!}
        />
      )}
      {step === 3 && (
        <Box pt={3} minHeight='inherit'>
          <SuccessContent
            title={t('successProposal.title')}
            description={t('successProposal.description')}
            onClick={handleOnClose}
          />
        </Box>
      )}
    </Modal>
  )
}

export default UploadVoteProposalModal
