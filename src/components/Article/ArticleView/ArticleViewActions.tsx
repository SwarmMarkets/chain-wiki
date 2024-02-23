import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import { useTranslation } from 'react-i18next'
import UploadVoteProposalModal from '../UploadVoteProposal/UploadVoteProposalModal'
import useModalState from '@src/hooks/useModalState'
import Select from '@src/components/ui/Select'
import { useState } from 'react'

interface ArticleViewActionsProps {
  articleId?: string
}

const ArticleViewActions: React.FC<ArticleViewActionsProps> = ({
  articleId,
}) => {
  const { t } = useTranslation('article')

  const { isOpen, open, close } = useModalState(false)
  const [selectedChoice, setSelectedChoice] = useState(0)

  const onChangeChoice = (value: number) => {
    setSelectedChoice(value)
  }

  return (
    <Flex justifyContent='space-between' width='100%'>
      <Flex $gap='5px'>
        <Button>{t('vote')}</Button>
        <Select
          onChange={onChangeChoice}
          value={selectedChoice}
          options={['One', 'Two', 'Three']}
        />
      </Flex>
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
