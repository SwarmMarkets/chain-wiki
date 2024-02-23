import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import { useTranslation } from 'react-i18next'
import UploadVoteProposalModal from '../UploadVoteProposal/UploadVoteProposalModal'
import useModalState from '@src/hooks/useModalState'
import MySelect from '@src/components/ui/Select/MySelect'
import { useState } from 'react'
import { useTokenContext } from '@src/hooks/context/useTokenContext'

interface ArticleViewActionsProps {
  articleId?: string
}

const ArticleViewActions: React.FC<ArticleViewActionsProps> = ({
  articleId,
}) => {
  const { t } = useTranslation('article')

  const token = useTokenContext()
  console.log(token)
  const { isOpen, open, close } = useModalState(false)
  const [selectedChoiceValue, setSelectedChoiceValue] = useState(0)

  const onChangeChoice = (value: number) => {
    setSelectedChoiceValue(value)
  }

  return (
    <Flex justifyContent='space-between' width='100%'>
      <Flex $gap='5px' alignItems='center'>
        <Button>{t('vote')}</Button>
        <MySelect
          onChange={onChangeChoice}
          value={selectedChoiceValue}
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
