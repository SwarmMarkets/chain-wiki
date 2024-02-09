import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Card from '../ui/Card'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import queryString from 'query-string'
import styled from 'styled-components'
import Checkbox from '../Checkbox'
import HistoryCardSkeleton from './HistoryCardSkeleton'
import {
  NfturiUpdate_OrderBy,
  NfturiUpdatesQuery,
  OrderDirection,
} from '@src/queries/gql/graphql'
import { useTranslation } from 'react-i18next'
import useNFTURIUpdates from '@src/hooks/subgraph/useNFTURIUpdates'

interface HistoryProjectListProps {
  onSelectProjects: (projects: NfturiUpdatesQuery['nfturiupdates']) => void
  selectedProjects: NfturiUpdatesQuery['nfturiupdates']
}

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }
`

const HistoryProjectList: React.FC<HistoryProjectListProps> = ({
  onSelectProjects,
  selectedProjects,
}) => {
  const location = useLocation()
  const { t } = useTranslation('history')
  const { projectId = '' } = useParams()
  const { nftUriUpdates, loading, refetching } = useNFTURIUpdates(projectId, {
    variables: {
      orderBy: NfturiUpdate_OrderBy.UpdatedAt,
      orderDirection: OrderDirection.Desc,
    },
  })

  const showSkeletons = loading && !refetching

  const onChangeCheckbox = (
    project: NfturiUpdatesQuery['nfturiupdates'][0]
  ) => {
    if (!selectedProjects) return
    const projectIsSelected = selectedProjects.find(
      item => item.id === project.id
    )

    if (projectIsSelected) {
      const newProjects = selectedProjects.filter(
        item => item.id !== project.id
      )
      onSelectProjects(newProjects)
      return
    }
    onSelectProjects([...selectedProjects, project])
  }

  const resetSelectedProjects = () => {
    onSelectProjects([])
  }

  return (
    <Flex flexDirection='column' $gap='10px'>
      {showSkeletons &&
        [...Array(5)].map((_, index) => <HistoryCardSkeleton key={index} />)}
      {nftUriUpdates &&
        selectedProjects &&
        nftUriUpdates.map((item, index) => (
          <Card key={item.id}>
            <Text>
              (
              {index === 0 ? (
                <Text>{t('curr')}</Text>
              ) : (
                <StyledLink
                  onClick={resetSelectedProjects}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldProjectId: nftUriUpdates[0]?.id,
                    newProjectId: item.id,
                  })}`}
                >
                  {t('curr')}
                </StyledLink>
              )}{' '}
              |{' '}
              {index === nftUriUpdates.length - 1 ? (
                <Text>{t('prev')}</Text>
              ) : (
                <StyledLink
                  onClick={resetSelectedProjects}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldProjectId: nftUriUpdates[index + 1]?.id,
                    newProjectId: item.id,
                  })}`}
                >
                  {t('prev')}
                </StyledLink>
              )}
              )
            </Text>
            <Checkbox
              ml='10px'
              checked={
                !!selectedProjects.find(
                  selectedItem => selectedItem.id === item.id
                )
              }
              disabled={
                selectedProjects.length >= 2 &&
                !selectedProjects.find(
                  selectedItem => selectedItem.id === item.id
                )
              }
              onChange={() => onChangeCheckbox(item)}
            />
            <Text ml='20px'>{new Date(+item.updatedAt).toLocaleString()} </Text>
          </Card>
        ))}
    </Flex>
  )
}

export default HistoryProjectList
