import React from 'react'
import Grid from '../ui/Grid'
import Card from '../ui/Card'
import { NftFullData } from '@src/shared/types/ipfs'
import {
  getTextContentFromHtml,
  limitString,
} from '@src/shared/utils/stringFormatting'
import { Link, generatePath } from 'react-router-dom'
import RoutePaths from '@src/shared/enums/routes-paths'
import styled from 'styled-components'

interface PeojectListProps {
  projects: NftFullData[]
}

const StyledLink = styled(Link)`
  display: contents;
`

const PeojectList: React.FC<PeojectListProps> = ({ projects }) => {
  return (
    <Grid gap='20px' minColumnWidth='250px'>
      {projects.map(project => (
        <StyledLink
          to={generatePath(RoutePaths.PROJECT, { projectId: project.id })}
          key={project.id}
        >
          <Card title={project.name}>
            {project.htmlContent
              ? limitString(getTextContentFromHtml(project.htmlContent), 300)
              : 'Description is not received'}
          </Card>
        </StyledLink>
      ))}
    </Grid>
  )
}

export default PeojectList
