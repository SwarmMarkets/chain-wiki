import Flex from '@src/components/ui/Flex'
import useTokenURIUpdates from '@src/hooks/subgraph/useTokenURIUpdates'
import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import HtmlDiffViewer from '../HtmlDiffViewer'
import {
  OrderDirection,
  TokenUriUpdate_OrderBy,
} from '@src/queries/gql/graphql'
import HistoryDifferenceSkeleton from '../HistoryDIfferenceSkeleton'
import { useTranslation } from 'react-i18next'

const HistoryTokenDifference = () => {
  const location = useLocation()
  const { t } = useTranslation('history')
  const {
    oldTokenId,
    newTokenId,
  }: { oldTokenId?: string; newTokenId?: string } = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  )
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
          <Flex>
            {fullTokenUriTokens?.map(token => (
              <Flex
                flex={1}
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                key={token.id}
              >
                <span>
                  {t('revisionAsOf')}{' '}
                  {new Date(+token.updatedAt).toLocaleString()}
                </span>
              </Flex>
            ))}
          </Flex>
          <HtmlDiffViewer
            oldHtml={fullTokenUriTokens[0].ipfsNewUriContent?.htmlContent || ''}
            newHtml={fullTokenUriTokens[1].ipfsNewUriContent?.htmlContent || ''}
          />
        </>
      ) : (
        <HistoryDifferenceSkeleton />
      )}
    </>
  )
}

export default HistoryTokenDifference
