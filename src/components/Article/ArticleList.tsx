import RoutePaths from '@src/shared/enums/routes-paths'
import { IpfsArticleContent, NFTQueryFullData } from '@src/shared/types/ipfs'
import {
  getTextContentFromHtml,
  limitString,
} from '@src/shared/utils/stringFormatting'
import { useStorage } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import { Link, generatePath, useParams } from 'react-router-dom'
import ContentMissing from '../common/ContentMissing'
import Card from '../ui/Card'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import ArticleCardSkeleton from './ArticleCardSkeleton'
import CreateArticleCard from './CreateArticleCard'
import { useTheme } from 'styled-components'
import Icon from '../ui/Icon'
import { useTranslation } from 'react-i18next'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import Button from '../ui/Button/Button'
import RequirePermissions from '../common/RequirePermissions'

interface ArticleListProps {
  projectAddress: string
  articles: NFTQueryFullData['tokens']
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  projectAddress,
}) => {
  const storage = useStorage()
  const { projectId } = useParams()
  const theme = useTheme()
  const { t } = useTranslation(['errors', 'article'])
  const [ipfsArticleContent, setIpfsArticleContent] = useState<
    IpfsArticleContent[] | null
  >(null)
  const { permissions } = useProjectPermissions(projectId)

  useEffect(() => {
    if (!articles) {
      return
    }

    (async () => {
      const promises = articles.map(item => storage?.downloadJSON(item.uri))

      const ipfsArticlesData = await Promise.all(promises)

      setIpfsArticleContent(ipfsArticlesData)
    })()
  }, [articles, storage])

  const noContent = !articles || articles.length === 0

  return (
    <Flex flexDirection='column' $gap='10px'>
      <RequirePermissions canCreateArticle projectAddress={projectId}>
        <CreateArticleCard projectAddress={projectAddress} />
      </RequirePermissions>
      {ipfsArticleContent
        ? articles?.map((article, index) =>
            !ipfsArticleContent[index].error ? (
              <Card
                to={generatePath(RoutePaths.PROJECT + RoutePaths.ARTICLE, {
                  projectId,
                  articleId: article.id,
                })}
                title={ipfsArticleContent[index].name}
                key={article.id}
              >
                <Text.p>
                  {limitString(
                    getTextContentFromHtml(
                      ipfsArticleContent[index].htmlContent
                    ),
                    700
                  )}
                </Text.p>
              </Card>
            ) : (
              <Card>
                <Flex justifyContent='space-between'>
                  <Flex $gap='8px' alignItems='center'>
                    <Icon
                      name='empty'
                      size={30}
                      color={theme.palette.borderPrimary}
                    />
                    <Text.p color={theme.palette.borderPrimary}>
                      {t('article.pendingDetails')}
                    </Text.p>
                  </Flex>
                  {permissions.canUpdateContent && (
                    <Link
                      to={`${generatePath(
                        RoutePaths.PROJECT + RoutePaths.ARTICLE,
                        { projectId, articleId: article.id }
                      )}?tab=2`}
                    >
                      <Button>{t('updateArticle', { ns: 'article' })}</Button>
                    </Link>
                  )}
                </Flex>
              </Card>
            )
          )
        : [...new Array(5)].map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
      {noContent ? <ContentMissing message='Articles missing' /> : null}
    </Flex>
  )
}

export default ArticleList
