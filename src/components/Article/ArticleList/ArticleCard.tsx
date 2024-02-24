import Card from '@src/components/ui/Card'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import { IpfsArticleContent } from '@src/shared/types/ipfs'
import { getTextContentFromHtml, limitString } from '@src/shared/utils'
import { generatePath } from 'react-router-dom'
import ArticleEmptyCard from './ArticleEmptyCard'

interface ArticleCardProps {
  articleId: string
  projectId: string
  content?: IpfsArticleContent
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  articleId,
  projectId,
  content,
}) => {
  if (content?.error || !content) {
    return <ArticleEmptyCard articleId={articleId} projectId={projectId} />
  }

  return (
    <Card
      to={generatePath(RoutePaths.PROJECT + RoutePaths.ARTICLE, {
        projectId,
        articleId: articleId,
      })}
      title={content.name}
    >
      <Text.p>
        {limitString(getTextContentFromHtml(content.htmlContent), 700)}
      </Text.p>
    </Card>
  )
}

export default ArticleCard
