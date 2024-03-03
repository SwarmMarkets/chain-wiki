import RoutePaths from '@src/shared/enums/routes-paths'
import { NFTsQueryFullData } from '@src/shared/types/ipfs'
import React from 'react'
import { generatePath } from 'react-router-dom'
import Grid from '../ui/Grid'
import AddProjectCard from './AddProjectCard'
import ProjectCard from './ProjectCard'
import { StyledLink } from './styled-components'
import ProjectSkeletonList from './ProjectSkeletonList'

interface ProjectListProps {
  loading: boolean
  projects?: NFTsQueryFullData[] | null
  addProjectCard?: boolean
  showRole?: boolean
}

const ProjectList: React.FC<ProjectListProps> = ({
  loading,
  projects,
  addProjectCard,
  showRole,
}) => {
  if (loading) {
    return <ProjectSkeletonList />
  }

  return (
    <>
      <Grid gap='20px' minColumnWidth='250px'>
        {addProjectCard && <AddProjectCard />}
        {projects?.map(project => (
          <StyledLink
            to={generatePath(RoutePaths.PROJECT, { projectId: project.id })}
            key={project.id}
          >
            <ProjectCard project={project} showRole={showRole} />
          </StyledLink>
        ))}
      </Grid>
    </>
  )
}

export default ProjectList
