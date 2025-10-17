'use client'

import { BasicModalProps } from 'src/shared/types/common-props'
import { useTranslation } from 'react-i18next'
import VoteOnProposalForm from './VoteOnProposalForm'
import useToken from 'src/hooks/subgraph/useToken'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import Modal from 'src/components/ui-kit/Modal'

interface VoteOnProposalModalProps extends BasicModalProps {
  nextStep(): void
}

const VoteOnProposalModal: React.FC<VoteOnProposalModalProps> = ({
  nextStep,
  ...props
}) => {
  const fullTokenId = useFullTokenIdParam()
  const { token } = useToken(fullTokenId)
  const { t } = useTranslation('token', { keyPrefix: 'voteOnProposal' })

  const voteProposal = token?.voteProposal

  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <div className="w-full max-w-lg p-6 bg-white rounded-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
        <p className="mb-4 text-gray-600 text-base leading-relaxed">{t('description')}</p>
        {voteProposal && (
          <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{voteProposal.title}</h3>
            <p className="text-gray-700 leading-relaxed">{voteProposal.body}</p>
          </div>
        )}
        <VoteOnProposalForm token={token} onSuccessSubmit={nextStep} />
      </div>
    </Modal>
  )
}

export default VoteOnProposalModal
