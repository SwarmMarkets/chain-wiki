import RoutePaths from '@src/shared/enums/routes-paths'
import { NFTQueryFullData } from '@src/shared/types/ipfs'
import React from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'
import AddProjectCard from './AddProjectCard'
import ProjectCard from './ProjectCard'
import ProjectSkeletonList from './ProjectSkeletonList'
import { StyledLink } from './styled-components'

interface ProjectListProps {
  loading: boolean
  projects?: NFTQueryFullData[] | null
  addProjectCard?: boolean
  showRole?: boolean
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: minmax(250px, 1fr);
  box-sizing: border-box;
  gap: 20px;
`

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
      <Wrapper>
        {addProjectCard && <AddProjectCard />}
        {projects?.map(project => (
          <StyledLink
            to={generatePath(RoutePaths.PROJECT, { projectId: project.id })}
            key={project.id}
          >
            <ProjectCard project={project} showRole={showRole} />
          </StyledLink>
        ))}
      </Wrapper>
    </>
  )
}

export default ProjectList
