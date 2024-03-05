import { NfturiUpdatesQuery } from '@src/queries/gql/graphql'
import queryString from 'query-string'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Checkbox from '@src/components/Checkbox'
import Card from '@src/components/ui/Card'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'

interface HistoryProjectListProps {
  onSelectProjects: (projects: NfturiUpdatesQuery['nfturiupdates']) => void
  selectedProjects: NfturiUpdatesQuery['nfturiupdates']
  history: NfturiUpdatesQuery['nfturiupdates']
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
  history,
}) => {
  const location = useLocation()
  const { t } = useTranslation('history')

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
      {history &&
        selectedProjects &&
        history.map((item, index) => (
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
                    oldProjectId: history[0]?.id,
                    newProjectId: item.id,
                  })}`}
                >
                  {t('curr')}
                </StyledLink>
              )}{' '}
              |{' '}
              {index === history.length - 1 ? (
                <Text>{t('prev')}</Text>
              ) : (
                <StyledLink
                  onClick={resetSelectedProjects}
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldProjectId: history[index + 1]?.id,
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
