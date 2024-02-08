import ContentLoader, { IContentLoaderProps } from 'react-content-loader'
import { JSX } from 'react/jsx-runtime'

const HistoryDifferenceSkeleton = (
  props: JSX.IntrinsicAttributes & IContentLoaderProps
) => (
  <ContentLoader
    speed={2}
    width='100%'
    height={650}
    viewBox='0 0 100% 650'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='0' y='0' rx='10' ry='10' width='100%' height='650' />
  </ContentLoader>
)

export default HistoryDifferenceSkeleton
