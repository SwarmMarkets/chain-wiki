import { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import HistoryTokenDifference from './HistoryTokenDifference'
import HistoryTokenList from './HistoryTokenList'
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

const HistoryToken = () => {
  const { t } = useTranslation('buttons')
  const location = useLocation()
  const { tokenId = '' } = useParams()

  const { tokenUriUpdates, loading, refetching } = useTokenURIUpdates(tokenId, {
    variables: {
      orderBy: TokenUriUpdate_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
    },
  })

  const showSkeletons = loading && !refetching

  const mode = useMemo(() => {
    const params = queryString.parse(location.search)
    if (params.oldTokenId && params.newTokenId) {
      return 'difference'
    } else {
      return 'list'
    }
  }, [location.search])
  const [selectedTokens, setSelectedTokens] = useState<
    TokenUriUpdatesQuery['tokenURIUpdates']
  >([])

  const onSelectTokens = (tokens: TokenUriUpdatesQuery['tokenURIUpdates']) => {
    setSelectedTokens(tokens)
  }

  const sortedTokensByUpdatedAt = useMemo(
    () => selectedTokens.sort((a, b) => +a.updatedAt - +b.updatedAt),
    [selectedTokens]
  )

  if ((!tokenUriUpdates || !tokenUriUpdates.length) && !showSkeletons)
    return <ContentMissing message='Token history missing' />

  return (
    <div>
      {mode === 'list' ? (
        <Box>
          {tokenUriUpdates &&
            tokenUriUpdates?.length > 1 &&
            (selectedTokens.length === 2 ? (
              <Link
                onClick={() => onSelectTokens([])}
                to={`?${queryString.stringify({
                  ...queryString.parse(location.search),
                  oldTokenId: sortedTokensByUpdatedAt[0]?.id,
                  newTokenId: sortedTokensByUpdatedAt[1]?.id,
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
              <HistoryTokenList
                selectedTokens={selectedTokens}
                onSelectTokens={onSelectTokens}
                history={tokenUriUpdates}
              />
            )}
          </Box>
        </Box>
      ) : (
        <HistoryTokenDifference />
      )}
    </div>
  )
}

export default HistoryToken
