import ContentLoader from 'react-content-loader'

const ProjectContentSkeleton = ({ ...rest }) => (
  <ContentLoader height='1500' width='100%' viewBox='0 0 100% 230' {...rest}>
    <rect x='0' y='0' rx='10' ry='10' width='100%' height='61' />
    <rect x='0' y='76' rx='10' ry='10' width='100%' height='700' />
  </ContentLoader>
)

export default ProjectContentSkeleton
