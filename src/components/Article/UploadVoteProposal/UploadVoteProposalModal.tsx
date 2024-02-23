import { BasicModalProps } from '@src/shared/types/common-props'
import UploadVoteProposal from './UploadVoteProposal'
import Modal from '@src/components/ui/Modal'
import useSteps from '@src/hooks/useSteps'
import { useState } from 'react'
import { VoteProposal } from '@src/shared/types/vote-proposal'
import ReviewVoteProposal from './ReviewVoteProposal'

interface UploadVoteProposalModalProps extends BasicModalProps {
  articleId?: string
}

const UploadVoteProposalModal: React.FC<UploadVoteProposalModalProps> = ({
  articleId,
  ...props
}) => {
  const { step, nextStep, backStep } = useSteps(2)
  const [voteProposal, setVoteProposal] = useState<VoteProposal>()

  const handleUploadVoteProposal = (value: VoteProposal) => {
    setVoteProposal(value)
  }

  if (!articleId) return null

  return (
    <Modal {...props} maxWidth='500px' width='100%'>
      {step === 1 && (
        <UploadVoteProposal
          nextStep={nextStep}
          onUploadVoteProposal={handleUploadVoteProposal}
        />
      )}
      {step === 2 && (
        <ReviewVoteProposal
          backStep={backStep}
          articleId={articleId}
          voteProposal={voteProposal!}
        />
      )}
    </Modal>
  )
}

export default UploadVoteProposalModal
