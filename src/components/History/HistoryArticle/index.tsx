import { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import HistoryArticleDifference from './HistoryArticleDifference'
import HistoryArticleList from './HistoryArticleList'
import {
  OrderDirection,
  TokenUriUpdate_OrderBy,
  TokenUriUpdatesQuery,
} from '@src/queries/gql/graphql'
import Box from '../../ui/Box'
import Button from '../../ui/Button/Button'
import { useTranslation } from 'react-i18next'
import useTokenURIUpdates from '@src/hooks/subgraph/useTokenURIUpdates'
import HistoryCardSkeleton from '../HistoryCardSkeleton'
import ContentMissing from '../../common/ContentMissing'

const HistoryArticle = () => {
  const { t } = useTranslation('buttons')
  const location = useLocation()
  const { articleId = '' } = useParams()

  const { tokenUriUpdates, loading, refetching } = useTokenURIUpdates(
    articleId,
    {
      variables: {
        orderBy: TokenUriUpdate_OrderBy.UpdatedAt,
        orderDirection: OrderDirection.Desc,
      },
    }
  )

  const showSkeletons = loading && !refetching

  const mode = useMemo(() => {
    const params = queryString.parse(location.search)
    if (params.oldArticleId && params.newArticleId) {
      return 'difference'
    } else {
      return 'list'
    }
  }, [location.search])
  const [selectedArticles, setSelectedArticles] = useState<
    TokenUriUpdatesQuery['tokenURIUpdates']
  >([])

  const onSelectArticles = (
    articles: TokenUriUpdatesQuery['tokenURIUpdates']
  ) => {
    setSelectedArticles(articles)
  }

  const sortedArticlesByUpdatedAt = useMemo(
    () => selectedArticles.sort((a, b) => +a.updatedAt - +b.updatedAt),
    [selectedArticles]
  )

if ((!tokenUriUpdates || !tokenUriUpdates.length) && !showSkeletons)
    return <ContentMissing message='Article history missing' />

  return (
    <div>
      {mode === 'list' ? (
        <Box>
          {tokenUriUpdates &&
            tokenUriUpdates?.length > 1 &&
            (selectedArticles.length === 2 ? (
              <Link
                onClick={() => onSelectArticles([])}
                to={`?${queryString.stringify({
                  ...queryString.parse(location.search),
                  oldArticleId: sortedArticlesByUpdatedAt[0]?.id,
                  newArticleId: sortedArticlesByUpdatedAt[1]?.id,
                })}`}
              >
                <Button>{t('compare')}</Button>
              </Link>
            ) : (
              <Button disabled>{t('compare')}</Button>
            ))}
          <Box mt='10px'>
            {showSkeletons &&
              [...Array(5)].map((_, index) => (
                <HistoryCardSkeleton key={index} />
              ))}
            {tokenUriUpdates && (
              <HistoryArticleList
                selectedArticles={selectedArticles}
                onSelectArticles={onSelectArticles}
                history={tokenUriUpdates}
              />
            )}
          </Box>
        </Box>
      ) : (
        <HistoryArticleDifference />
      )}
    </div>
  )
}

export default HistoryArticle
