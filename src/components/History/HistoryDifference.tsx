import Flex from '@src/components/ui/Flex'
import useTokenURIUpdates from '@src/hooks/subgraph/useTokenURIUpdates'
import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import HtmlDiffViewer from './HtmlDiffViewer'
import {
  OrderDirection,
  TokenUriUpdate_OrderBy,
} from '@src/queries/gql/graphql'
import HistoryDifferenceSkeleton from './HistoryDIfferenceSkeleton'

const HistoryDifference = () => {
  const location = useLocation()
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
            {fullTokenUriTokens?.map(article => (
              <Flex
                flex={1}
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                key={article.id}
              >
                <span>
                  Revision as of {new Date(+article.updatedAt).toLocaleString()}
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

export default HistoryDifference
