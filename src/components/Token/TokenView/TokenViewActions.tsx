import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import Flex from 'src/components/ui/Flex'
import useModalState from 'src/hooks/useModalState'
import UploadVoteProposalModal from '../UploadVoteProposal/UploadVoteProposalModal'
import VoteOnProposalButton from '../VoteOnProposal'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import useToken from 'src/hooks/subgraph/useToken'

const TokenViewActions: React.FC = () => {
  const { t } = useTranslation('token')
  const fullTokenId = useFullTokenIdParam()
  const { token } = useToken(fullTokenId)
  const uploadVoteProposal = useModalState(false)

  const voteProposal = token?.voteProposal

  const isVotingStarted =
    !!voteProposal?.start && dayjs().isAfter(dayjs.unix(voteProposal.start))
  const isVotingEnded =
    !!voteProposal?.end && dayjs().isAfter(dayjs.unix(voteProposal.end))

  const isVotingEnabled = voteProposal && isVotingStarted && !isVotingEnded

  return (
    <Flex justifyContent='flex-end' width='100%' $gap='20px'>
      {isVotingEnabled ? (
        <VoteOnProposalButton px={4}>{t('vote')}</VoteOnProposalButton>
      ) : null}

      <UploadVoteProposalModal
        isOpen={uploadVoteProposal.isOpen}
        onClose={uploadVoteProposal.close}
      />
    </Flex>
  )
}

export default TokenViewActions
