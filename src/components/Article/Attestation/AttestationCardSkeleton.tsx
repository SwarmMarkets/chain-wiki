import ContentLoader, { IContentLoaderProps } from 'react-content-loader'
import { JSX } from 'react/jsx-runtime'

const AttestationCardSkeleton = (
  props: JSX.IntrinsicAttributes & IContentLoaderProps
) => (
  <ContentLoader
    speed={2}
    width='100%'
    height={100}
    viewBox='0 0 100% 100'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='0' y='0' rx='10' ry='10' width='100%' height='100' />
  </ContentLoader>
)

export default AttestationCardSkeleton
