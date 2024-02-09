import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import HistoryProjcetDifference from './HistoryProjectDifference'
import HistoryProjectList from './HistoryProjectList'
import { NfturiUpdatesQuery } from '@src/queries/gql/graphql'
import Box from '../ui/Box'
import Button from '../ui/Button/Button'
import { useTranslation } from 'react-i18next'

const HistoryProject = () => {
  const { t } = useTranslation('buttons')
  const location = useLocation()
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

  const onSelectProjects = (projects: NfturiUpdatesQuery['nfturiupdates']) => {
    setSelectedProjects(projects)
  }

  const sortedProjectsByUpdatedAt = useMemo(
    () => selectedProjects.sort((a, b) => +a.updatedAt - +b.updatedAt),
    [selectedProjects]
  )
  return (
    <div>
      {mode === 'list' ? (
        <Box>
          {selectedProjects.length === 2 ? (
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
          )}
          <Box mt='10px'>
            <HistoryProjectList
              selectedProjects={selectedProjects}
              onSelectProjects={onSelectProjects}
            />
          </Box>
        </Box>
      ) : (
        <HistoryProjcetDifference />
      )}
    </div>
  )
}

export default HistoryProject
