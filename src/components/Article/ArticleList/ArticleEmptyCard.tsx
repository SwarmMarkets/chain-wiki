import RequirePermissions from '@src/components/common/RequirePermissions'
import Button from '@src/components/ui/Button/Button'
import Card from '@src/components/ui/Card'
import Flex from '@src/components/ui/Flex'
import Icon from '@src/components/ui/Icon'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import { useTranslation } from 'react-i18next'
import { Link, generatePath } from 'react-router-dom'
import { useTheme } from 'styled-components'

interface ArticleEmptyCardProps {
  articleId: string
  projectId: string
}

const ArticleEmptyCard: React.FC<ArticleEmptyCardProps> = ({
  articleId,
  projectId,
}) => {
  const { t } = useTranslation(['errors', 'article'])
  const theme = useTheme()

  return (
    <Card>
      <Flex justifyContent='space-between'>
        <Flex $gap='8px' alignItems='center'>
          <Icon name='empty' size={30} color={theme.palette.borderPrimary} />
          <Text.p color={theme.palette.borderPrimary}>
            {t('article.pendingDetails')}
          </Text.p>
        </Flex>
        <RequirePermissions canUpdateContent projectAddress={projectId}>
          <Link
            to={`${generatePath(RoutePaths.PROJECT + RoutePaths.ARTICLE, {
              projectId,
              articleId: articleId,
            })}?tab=2`}
          >
            <Button>{t('updateArticle', { ns: 'article' })}</Button>
          </Link>
        </RequirePermissions>
      </Flex>
    </Card>
  )
}

export default ArticleEmptyCard
