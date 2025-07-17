import Modal from 'src/components/ui-kit/Modal'
import useSteps from 'src/hooks/useSteps'
import { BasicModalProps } from 'src/shared/types/common-props'
import { VoteProposal } from 'src/shared/types/vote-proposal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReviewVoteProposal from './ReviewVoteProposal'
import UploadVoteProposal from './UploadVoteProposal'
import Button from 'src/components/ui-kit/Button/Button'
import Icon from 'src/components/ui-kit/Icon/Icon'

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
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          voteProposal={voteProposal!}
        />
      )}
      {step === 3 && (
        <div className="flex flex-col items-center justify-center py-8 px-4 min-h-[300px] w-full max-w-lg">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Icon name="success-icon" size={40} color="#219653" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">{t('successProposal.title')}</h2>
          <p className="text-gray-600 text-base mb-6 text-center">{t('successProposal.description')}</p>
          <Button onClick={handleOnClose} className="w-full max-w-xs">{t('common:successModal.done')}</Button>
        </div>
      )}
    </Modal>
  )
}

export default UploadVoteProposalModal
