import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import useModalState from '@src/hooks/useModalState'
import { useTranslation } from 'react-i18next'
import UploadVoteProposalModal from '../UploadVoteProposal/UploadVoteProposalModal'
import VoteOnProposalModal from '../VoteOnProposal/VoteOnProposalModal'

const ArticleViewActions: React.FC = () => {
  const { t } = useTranslation('article')
  const uploadVoteProposal = useModalState(false)
  const voteOnProposal = useModalState(false)

  return (
    <Flex justifyContent='space-between' width='100%'>
      <Button onClick={voteOnProposal.open} px={4}>
        {t('vote')}
      </Button>

      <Button onClick={uploadVoteProposal.open}>{t('proposeToVote')}</Button>

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
