import Grid from '../ui/Grid'
import ProjectSkeleton from './ProjectSkeleton'

const ProjectSkeletonList = () => {
  return (
    <Grid gap='20px' minColumnWidth='250px'>
      {[...new Array(20)].map((_, index) => (
        <ProjectSkeleton key={index} />
      ))}
    </Grid>
  )
}

export default ProjectSkeletonList
