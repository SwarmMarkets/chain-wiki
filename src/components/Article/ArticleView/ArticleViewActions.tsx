import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import { useTranslation } from 'react-i18next'
import UploadVoteProposalModal from '../UploadVoteProposal/UploadVoteProposalModal'
import useModalState from '@src/hooks/useModalState'
import { ChangeEvent, useState } from 'react'
import { useTokenContext } from '@src/hooks/context/useTokenContext'
import { Select } from '@src/components/ui/Select'

interface ArticleViewActionsProps {
  articleId?: string
}

const ArticleViewActions: React.FC<ArticleViewActionsProps> = ({
  articleId,
}) => {
  const { t } = useTranslation('article')

  const token = useTokenContext()

  const { isOpen, open, close } = useModalState(false)
  const [selectedChoiceValue, setSelectedChoiceValue] = useState('')

  const onChangeChoice = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedChoiceValue(e.target.value)
  }

  return (
    <Flex justifyContent='space-between' width='100%'>
      <Flex $gap='5px' alignItems='center'>
        <Button>{t('vote')}</Button>
        {token?.ipfsContent?.voteProposal?.choices && (
          <Select value={selectedChoiceValue} onChange={onChangeChoice}>
            {Object.values(token?.ipfsContent?.voteProposal?.choices).map(
              choice => (
                <option key={choice} value={choice}>
                  {choice.charAt(0).toUpperCase() + choice.slice(1)}
                </option>
              )
            )}
          </Select>
        )}
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
