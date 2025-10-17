'use client'

import { useSearchParams } from 'next/navigation'
import HtmlDiffViewer from '../HtmlDiffViewer'
import useTokenURIUpdates from 'src/hooks/subgraph/useTokenURIUpdates'
import { OrderDirection, TokenUriUpdate_OrderBy } from 'src/queries/gql/graphql'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import Skeleton from 'src/components/ui-kit/Skeleton/Skeleton'

const HistoryTokenDifference = () => {
  const searchParams = useSearchParams()
  const { t } = useTranslation('history')

  const oldTokenId = searchParams.get('oldTokenId') || undefined
  const newTokenId = searchParams.get('newTokenId') || undefined

  const { fullTokenUriTokens } = useTokenURIUpdates(
    oldTokenId || '',
    {
      variables: {
        filter: {
          or: [{ id: newTokenId }, { id: oldTokenId }],
        },
        orderBy: TokenUriUpdate_OrderBy.UpdatedAt,
        orderDirection: OrderDirection.Asc,
      },
    },
    { fetchFullData: true }
  )

  return (
    <>
      {fullTokenUriTokens ? (
        <>
          <div className='flex'>
            {fullTokenUriTokens.map(token => (
              <div
                className='flex flex-1 justify-center items-center flex-col'
                key={token.id}
              >
                <span>
                  {t('revisionAsOf')}{' '}
                  {dayjs(+token.updatedAt * 1000).format('MMMM D, YYYY h:mm A')}
                </span>
              </div>
            ))}
          </div>
          <HtmlDiffViewer
            oldHtml={fullTokenUriTokens[0].ipfsNewUriContent?.htmlContent || ''}
            newHtml={fullTokenUriTokens[1].ipfsNewUriContent?.htmlContent || ''}
          />
        </>
      ) : (
        <Skeleton height={650} />
      )}
    </>
  )
}

export default HistoryTokenDifference
