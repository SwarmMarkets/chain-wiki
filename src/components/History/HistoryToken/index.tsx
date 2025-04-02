import { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import HistoryTokenDifference from './HistoryTokenDifference'
import HistoryTokenList from './HistoryTokenList'
import {
  OrderDirection,
  TokenUriUpdate_OrderBy,
  TokenUriUpdatesQuery,
} from 'src/queries/gql/graphql'
import Text from '../../ui/Text'
import { useTranslation } from 'react-i18next'
import useTokenURIUpdates from 'src/hooks/subgraph/useTokenURIUpdates'
import HistoryCardSkeleton from '../HistoryCardSkeleton'
import { useTheme } from 'styled-components'
import Button from 'src/components/ui-kit/Button/Button'
import Skeleton from 'src/components/ui-kit/Skeleton/Skeleton'

const HistoryToken = () => {
  const theme = useTheme()
  const { t } = useTranslation(['buttons', 'history'])
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
    return (
      <div className='mt-1 text-center'>
        {t('messages.noHistory', { ns: 'history' })}
      </div>
    )

  return (
    <div>
      {mode === 'list' ? (
        <div>
          {selectedTokens.length === 2 ? (
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
          )}
          <div className='mt-3'>
            {showSkeletons && (
              <div className='flex flex-col gap-2'>
                <Skeleton height={55} count={10} />
              </div>
            )}
            {tokenUriUpdates && (
              <HistoryTokenList
                selectedTokens={selectedTokens}
                onSelectTokens={onSelectTokens}
                history={tokenUriUpdates}
              />
            )}
          </div>
        </div>
      ) : (
        <HistoryTokenDifference />
      )}
    </div>
  )
}

export default HistoryToken
