import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import { useTranslation } from 'react-i18next'
import UploadVoteProposalModal from '../UploadVoteProposal/UploadVoteProposalModal'
import useModalState from '@src/hooks/useModalState'

interface ArticleViewActionsProps {
  articleId?: string
}

const ArticleViewActions: React.FC<ArticleViewActionsProps> = ({
  articleId,
}) => {
  const { t } = useTranslation('article')

  const { isOpen, open, close } = useModalState(false)

  return (
    <Flex>
      <Button onClick={open}>{t('proposeToVote')}</Button>

      <UploadVoteProposalModal
        articleId={articleId}
        isOpen={isOpen}
        onClose={close}
      />
    </Flex>
  )
}

export default ArticleViewActions
