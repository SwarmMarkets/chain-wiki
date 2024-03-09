import { TokensQueryFullData } from '@src/shared/types/ipfs'
import { useParams } from 'react-router-dom'
import ContentMissing from '../../common/ContentMissing'
import RequirePermissions from '../../common/RequirePermissions'
import Flex from '../../ui/Flex'
import ArticleCardSkeleton from '../ArticleCardSkeleton'
import CreateArticleCard from '../CreateArticleCard'
import ArticleCard from './ArticleCard'

interface ArticleListProps {
  articles: TokensQueryFullData[] | null
  projectAddress: string
  loading?: boolean
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  projectAddress,
  loading,
}) => {
  const { projectId = '' } = useParams()

  const noContent = !loading && (articles?.length === 0 || !articles)

  return (
    <Flex flexDirection='column' $gap='10px'>
      <RequirePermissions canCreateArticle projectAddress={projectId}>
        <CreateArticleCard projectAddress={projectAddress} />
      </RequirePermissions>
      {noContent ? (
        <ContentMissing message='Articles missing' />
      ) : (
        articles?.map(article => (
          <ArticleCard
            key={article.id}
            articleId={article.id}
            projectId={projectId}
            content={article.ipfsContent}
          />
        ))
      )}

      {loading &&
        [...new Array(5)].map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
    </Flex>
  )
}

export default ArticleList
