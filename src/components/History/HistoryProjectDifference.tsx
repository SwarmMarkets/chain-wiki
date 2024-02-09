import Flex from '@src/components/ui/Flex'
import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import HtmlDiffViewer from './HtmlDiffViewer'
import { NfturiUpdate_OrderBy, OrderDirection } from '@src/queries/gql/graphql'
import HistoryDifferenceSkeleton from './HistoryDIfferenceSkeleton'
import { useTranslation } from 'react-i18next'
import useNFTURIUpdates from '@src/hooks/subgraph/useNFTURIUpdates'

const HistoryProjectDifference = () => {
  const location = useLocation()
  const { t } = useTranslation('history')
  const {
    oldProjectId,
    newProjectId,
  }: { oldProjectId?: string; newProjectId?: string } = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  )
  const { fullNftUriUpdates } = useNFTURIUpdates(
    oldProjectId || '',
    {
      variables: {
        filter: {
          or: [{ id: newProjectId }, { id: oldProjectId }],
        },
        orderBy: NfturiUpdate_OrderBy.UpdatedAt,
        orderDirection: OrderDirection.Asc,
      },
    },
    { fetchFullData: true }
  )

  return (
    <>
      {fullNftUriUpdates ? (
        <>
          <Flex>
            {fullNftUriUpdates?.map(project => (
              <Flex
                flex={1}
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                key={project.id}
              >
                <span>
                  {t('revisionAsOf')}{' '}
                  {new Date(+project.updatedAt).toLocaleString()}
                </span>
              </Flex>
            ))}
          </Flex>
          <HtmlDiffViewer
            oldHtml={fullNftUriUpdates[0].ipfsNewUriContent?.htmlContent || ''}
            newHtml={fullNftUriUpdates[1].ipfsNewUriContent?.htmlContent || ''}
          />
        </>
      ) : (
        <HistoryDifferenceSkeleton />
      )}
    </>
  )
}

export default HistoryProjectDifference
