'use client'

import { useMemo, useState } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Button from 'src/components/ui-kit/Button/Button'
import Skeleton from 'src/components/ui-kit/Skeleton/Skeleton'
import useTokenURIUpdates from 'src/hooks/subgraph/useTokenURIUpdates'
import {
  OrderDirection,
  TokenUriUpdate_OrderBy,
  TokenUriUpdatesQuery,
} from 'src/queries/gql/graphql'
import HistoryTokenDifference from './HistoryTokenDifference'
import HistoryTokenList from './HistoryTokenList'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import queryString from 'query-string'

const HistoryToken = () => {
  const { t } = useTranslation(['buttons', 'history'])
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const tokenId = useFullTokenIdParam()

  const { tokenUriUpdates, loading, refetching } = useTokenURIUpdates(tokenId, {
    variables: {
      orderBy: TokenUriUpdate_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
    },
  })

  const showSkeletons = loading && !refetching

  const mode = useMemo(() => {
    const oldTokenId = searchParams.get('oldTokenId')
    const newTokenId = searchParams.get('newTokenId')
    return oldTokenId && newTokenId ? 'difference' : 'list'
  }, [searchParams])

  const [selectedTokens, setSelectedTokens] = useState<
    TokenUriUpdatesQuery['tokenURIUpdates']
  >([])

  const onSelectTokens = (tokens: TokenUriUpdatesQuery['tokenURIUpdates']) => {
    setSelectedTokens(tokens)
  }

  const sortedTokensByUpdatedAt = useMemo(
    () => selectedTokens.slice().sort((a, b) => +a.updatedAt - +b.updatedAt),
    [selectedTokens]
  )

  if ((!tokenUriUpdates || !tokenUriUpdates.length) && !showSkeletons)
    return (
      <div className='mt-1 text-center'>
        {t('messages.noHistory', { ns: 'history' })}
      </div>
    )

  const currentQuery = Object.fromEntries(searchParams.entries())

  return (
    <div>
      {mode === 'list' ? (
        <div>
          {selectedTokens.length === 2 ? (
            <Link
              href={`${pathname}?${queryString.stringify({
                ...currentQuery,
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
