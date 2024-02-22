import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import { useTranslation } from 'react-i18next'

const ArticleViewActions = () => {
  const { t } = useTranslation('article')

  return (
    <Flex>
      <Button>{t('proposeToVote')}</Button>
    </Flex>
  )
}

export default ArticleViewActions
