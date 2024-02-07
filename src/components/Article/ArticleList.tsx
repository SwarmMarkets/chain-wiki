import RoutePaths from '@src/shared/enums/routes-paths'
import { IpfsArticleContent, NfTQueryFullData } from '@src/shared/types/ipfs'
import {
  getTextContentFromHtml,
  limitString,
} from '@src/shared/utils/stringFormatting'
import { useStorage } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import { generatePath, useParams } from 'react-router-dom'
import ContentMissing from '../common/ContentMissing'
import Card from '../ui/Card'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import ArticleCardSkeleton from './ArticleCardSkeleton'
import CreateArticleCard from './CreateArticleCard'

interface ArticleListProps {
  projectAddress: string
  articles: NfTQueryFullData['tokens']
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, projectAddress }) => {
  const storage = useStorage()
  const { projectId } = useParams()
  const [ipfsArticleContent, setIpfsArticleContent] = useState<
    IpfsArticleContent[] | null
  >(null)

  useEffect(() => {
    if (!articles) {
      return
    }

    (async () => {
      const promises = articles.map(item => storage?.downloadJSON(item.uri))

      const additionalData = await Promise.all(promises)

      const ipfsArticlesData = articles.map((item, index) => {
        if (additionalData[index].error) {
          return item
        }

        return {
          ...item,
          ...additionalData[index],
        }
      })

      setIpfsArticleContent(ipfsArticlesData)
    })()
  }, [articles, storage])

  const noContent = !articles || articles.length === 0

  return (
    <Flex flexDirection='column' $gap='10px'>
      <CreateArticleCard projectAddress={projectAddress} />
      {ipfsArticleContent
        ? articles?.map((article, index) => (
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
                  getTextContentFromHtml(ipfsArticleContent[index].htmlContent),
                  700
                )}
              </Text.p>
            </Card>
          ))
        : [...new Array(5)].map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        {noContent ? <ContentMissing message='Articles missing' /> : null}
    </Flex>
  )
}

export default ArticleList
