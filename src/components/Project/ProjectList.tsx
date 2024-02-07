import React from 'react'
import Grid from '../ui/Grid'
import Card from '../ui/Card'
import { NfTsQueryFullData } from '@src/shared/types/ipfs'
import { Link, generatePath } from 'react-router-dom'
import RoutePaths from '@src/shared/enums/routes-paths'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import Icon from '../ui/Icon'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import useModalState from '@src/hooks/useModalState'
import CreateProjectModal from '../CreateProject/CreateProjectModal'
import ProjectCard from './ProjectCard'

interface ProjectListProps {
  projects: NfTsQueryFullData[]
  addProjectCard?: boolean
  showRole?: boolean
}

const StyledLink = styled(Link)`
  display: contents;
`

const StyledCard = styled(Card)`
  cursor: pointer;
`

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  addProjectCard,
  showRole,
}) => {
  const { t } = useTranslation(['errors', 'projects'])
  const theme = useTheme()
  const { isOpen, open, close } = useModalState(false)

  return (
    <>
      <Grid gap='20px' minColumnWidth='250px'>
        {addProjectCard && (
          <StyledCard
            {...(!projects.length && { height: 200, width: 250 })}
            onClick={open}
          >
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              height='100%'
              $gap='5px'
            >
              <Icon name='plus' size={70} color={theme.palette.borderPrimary} />
              <Text color={theme.palette.borderPrimary}>
                {t('addProject', { ns: 'projects' })}
              </Text>
            </Flex>
          </StyledCard>
        )}
        {projects.map(project => (
          <StyledLink
            to={generatePath(RoutePaths.PROJECT, { projectId: project.id })}
            key={project.id}
          >
            <ProjectCard project={project} showRole={showRole} />
          </StyledLink>
        ))}
      </Grid>
      <CreateProjectModal isOpen={isOpen} onClose={close} />
    </>
  )
}

export default ProjectList
