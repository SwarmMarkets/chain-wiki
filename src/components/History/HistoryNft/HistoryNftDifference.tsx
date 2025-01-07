import Flex from 'src/components/ui/Flex'
import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import HtmlDiffViewer from '../HtmlDiffViewer'
import { NfturiUpdate_OrderBy, OrderDirection } from 'src/queries/gql/graphql'
import HistoryDifferenceSkeleton from '../HistoryDIfferenceSkeleton'
import { useTranslation } from 'react-i18next'
import useNFTURIUpdates from 'src/hooks/subgraph/useNFTURIUpdates'
import dayjs from 'dayjs'

const HistoryNftDifference = () => {
  const location = useLocation()
  const { t } = useTranslation('history')
  const { oldNftId, newNftId }: { oldNftId?: string; newNftId?: string } =
    useMemo(() => queryString.parse(location.search), [location.search])
  const { fullNftUriUpdates } = useNFTURIUpdates(
    oldNftId || '',
    {
      variables: {
        filter: {
          or: [{ id: newNftId }, { id: oldNftId }],
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
            {fullNftUriUpdates?.map(nft => (
              <Flex
                flex={1}
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                key={nft.id}
              >
                <span>
                  {t('revisionAsOf')}{' '}
                  {dayjs(+nft.updatedAt * 1000).format('MMMM D, YYYY h:mm A')}
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

export default HistoryNftDifference
