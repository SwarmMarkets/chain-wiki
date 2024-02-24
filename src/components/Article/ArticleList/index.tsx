import useTokens from '@src/hooks/subgraph/useTokens'
import { unifyAddressToId } from '@src/shared/utils'
import { useParams } from 'react-router-dom'
import ContentMissing from '../../common/ContentMissing'
import RequirePermissions from '../../common/RequirePermissions'
import Flex from '../../ui/Flex'
import ArticleCardSkeleton from '../ArticleCardSkeleton'
import ArticleCard from './ArticleCard'
import CreateArticleCard from '../CreateArticleCard'

interface ArticleListProps {
  projectAddress: string
}

const ArticleList: React.FC<ArticleListProps> = ({ projectAddress }) => {
  const { projectId = '' } = useParams()
  const { fullTokens: articles, loading } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(projectAddress) } },
    },
    { fetchFullData: true }
  )

  const noContent = !loading && articles?.length === 0

  if (loading) {
    return (
      <Flex flexDirection='column' $gap='10px'>
        {[...new Array(5)].map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </Flex>
    )
  }

  if (noContent) {
    return (
      <Flex flexDirection='column' $gap='10px'>
        <ContentMissing message='Articles missing' />
      </Flex>
    )
  }

  return (
    <Flex flexDirection='column' $gap='10px'>
      <RequirePermissions canCreateArticle projectAddress={projectId}>
        <CreateArticleCard projectAddress={projectAddress} />
      </RequirePermissions>
      {articles?.map(article => (
        <ArticleCard
          key={article.id}
          articleId={article.id}
          projectId={projectId}
          content={article.ipfsContent}
        />
      ))}
    </Flex>
  )
}

export default ArticleList
