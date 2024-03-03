import ContentLoader, { IContentLoaderProps } from 'react-content-loader'
import { JSX } from 'react/jsx-runtime'

const EditorSkeleton = ({
  height,
  ...props
}: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width='100%'
    height={height}
    viewBox={`0 0 100% ${height}`}
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='0' y='0' rx='10' ry='10' width='100%' height={height} />
  </ContentLoader>
)

export default EditorSkeleton
