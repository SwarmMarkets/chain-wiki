import { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import HistoryProjcetDifference from './HistoryProjectDifference'
import HistoryProjectList from './HistoryProjectList'
import {
  NfturiUpdate_OrderBy,
  NfturiUpdatesQuery,
  OrderDirection,
} from '@src/queries/gql/graphql'
import Box from '@src/components/ui/Box'
import Button from '@src/components/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import useNFTURIUpdates from '@src/hooks/subgraph/useNFTURIUpdates'
import ContentMissing from '@src/components/common/ContentMissing'
import HistoryCardSkeleton from '../HistoryCardSkeleton'

const HistoryProject = () => {
  const { t } = useTranslation('buttons')
  const location = useLocation()
  const { projectId = '' } = useParams()
  const { nftUriUpdates, loading, refetching } = useNFTURIUpdates(projectId, {
    variables: {
      orderBy: NfturiUpdate_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
    },
  })
  const mode = useMemo(() => {
    const params = queryString.parse(location.search)
    if (params.oldProjectId && params.newProjectId) {
      return 'difference'
    } else {
      return 'list'
    }
  }, [location.search])
  const [selectedProjects, setSelectedProjects] = useState<
    NfturiUpdatesQuery['nfturiupdates']
  >([])
  const showSkeletons = loading && !refetching

  const onSelectProjects = (projects: NfturiUpdatesQuery['nfturiupdates']) => {
    setSelectedProjects(projects)
  }

  const sortedProjectsByUpdatedAt = useMemo(
    () => selectedProjects.sort((a, b) => +a.updatedAt - +b.updatedAt),
    [selectedProjects]
  )

  if (!nftUriUpdates && !showSkeletons)
    return <ContentMissing message='Project history missing' />

  return (
    <div>
      {mode === 'list' ? (
        <Box>
          {nftUriUpdates &&
            nftUriUpdates?.length > 1 &&
            (selectedProjects.length === 2 ? (
              <Link
                onClick={() => onSelectProjects([])}
                to={`?${queryString.stringify({
                  ...queryString.parse(location.search),
                  oldProjectId: sortedProjectsByUpdatedAt[0]?.id,
                  newProjectId: sortedProjectsByUpdatedAt[1]?.id,
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
            {nftUriUpdates && (
              <HistoryProjectList
                selectedProjects={selectedProjects}
                onSelectProjects={onSelectProjects}
                history={nftUriUpdates}
              />
            )}
          </Box>
        </Box>
      ) : (
        <HistoryProjcetDifference />
      )}
    </div>
  )
}

export default HistoryProject
