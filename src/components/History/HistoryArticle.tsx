import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import HistoryArticleDifference from './HistoryArticleDifference'
import HistoryArticleList from './HistoryArticleList'
import { TokenUriUpdatesQuery } from '@src/queries/gql/graphql'
import Box from '../ui/Box'
import Button from '../ui/Button/Button'
import { useTranslation } from 'react-i18next'

const HistoryArticle = () => {
  const { t } = useTranslation('buttons')
  const location = useLocation()
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
  return (
    <div>
      {mode === 'list' ? (
        <Box>
          {selectedArticles.length === 2 ? (
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
          )}
          <Box mt='10px'>
            <HistoryArticleList
              selectedArticles={selectedArticles}
              onSelectArticles={onSelectArticles}
            />
          </Box>
        </Box>
      ) : (
        <HistoryArticleDifference />
      )}
    </div>
  )
}

export default HistoryArticle
