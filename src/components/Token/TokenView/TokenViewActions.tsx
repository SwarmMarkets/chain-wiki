import RequirePermissions from '@src/components/common/RequirePermissions'
import { useTokenContext } from '@src/components/providers/TokenContext'
import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import useModalState from '@src/hooks/useModalState'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import UploadVoteProposalModal from '../UploadVoteProposal/UploadVoteProposalModal'
import VoteOnProposalButton from '../VoteOnProposal'

const TokenViewActions: React.FC = () => {
  const { t } = useTranslation('article')
  const token = useTokenContext()
  const uploadVoteProposal = useModalState(false)

  const projectId = token?.id.split('-')[0]

  const voteProposal = token?.ipfsContent?.voteProposal

  const isVotingStarted =
    !!voteProposal?.start && dayjs().isAfter(dayjs.unix(voteProposal.start))
  const isVotingEnded =
    !!voteProposal?.end && dayjs().isAfter(dayjs.unix(voteProposal.end))

  const isVotingEnabled = voteProposal && isVotingStarted && !isVotingEnded

  return (
    <Flex justifyContent='flex-end' width='100%' $gap='20px'>
      <RequirePermissions canUpdateContent projectAddress={projectId}>
        {/* TODO CHECK IF PROPOSAL DISABLED ON CONTRACT SIDE */}
        <Button onClick={uploadVoteProposal.open} disabled={isVotingEnabled}>
          {t('connectProposal')}
        </Button>
      </RequirePermissions>

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
