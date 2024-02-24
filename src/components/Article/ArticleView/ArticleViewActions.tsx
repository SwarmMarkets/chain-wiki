import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import useModalState from '@src/hooks/useModalState'
import { useTranslation } from 'react-i18next'
import UploadVoteProposalModal from '../UploadVoteProposal/UploadVoteProposalModal'
import VoteOnProposalModal from '../VoteOnProposal/VoteOnProposalModal'
import RequirePermissions from '@src/components/common/RequirePermissions'
import { useTokenContext } from '@src/components/providers/TokenContext'
import * as dayjs from 'dayjs'

const ArticleViewActions: React.FC = () => {
  const { t } = useTranslation('article')
  const token = useTokenContext()
  const uploadVoteProposal = useModalState(false)
  const voteOnProposal = useModalState(false)

  const projectId = token?.id.split('-')[0]

  const voteProposal = token?.ipfsContent?.voteProposal

  const isVotingStarted =
    voteProposal?.start && dayjs().isAfter(dayjs.unix(voteProposal.start))
  const isVotingEnded =
    voteProposal?.end && dayjs().isAfter(dayjs.unix(voteProposal.end))

  const isVotingEnabled = voteProposal && isVotingStarted && !isVotingEnded

  return (
    <Flex justifyContent='flex-end' width='100%' $gap='20px'>
      <RequirePermissions canUpdateContent projectAddress={projectId}>
        <Button onClick={uploadVoteProposal.open}>{t('proposeToVote')}</Button>
      </RequirePermissions>

      {isVotingEnabled ? (
        <Button onClick={voteOnProposal.open} px={4}>
          {t('vote')}
        </Button>
      ) : null}

      <UploadVoteProposalModal
        isOpen={uploadVoteProposal.isOpen}
        onClose={uploadVoteProposal.close}
      />

      <VoteOnProposalModal
        isOpen={voteOnProposal.isOpen}
        onClose={voteOnProposal.close}
      />
    </Flex>
  )
}

export default ArticleViewActions
