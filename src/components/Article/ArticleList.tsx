import RoutePaths from '@src/shared/enums/routes-paths'
import { generatePath, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Card from '../ui/Card'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import {
  getTextContentFromHtml,
  limitString,
} from '@src/shared/utils/stringFormatting'
import { IpfsArticleContent, NfTQueryFullData } from '@src/shared/types/ipfs'
import { useStorage } from '@thirdweb-dev/react'
import ArticleCardSkeleton from './ArticleCardSkeleton'

interface ArticleListProps {
  articles: NfTQueryFullData['tokens']
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
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

  return (
    <Flex flexDirection='column' $gap='10px'>
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
    </Flex>
  )
}

export default ArticleList
