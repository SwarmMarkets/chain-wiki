'use client'

import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

interface INftSkeletonProps extends IContentLoaderProps {
  index?: number // stable key for SSR hydration
}

const NftSkeleton = ({ index, ...props }: INftSkeletonProps) => (
  <ContentLoader
    speed={2}
    width='100%'
    height={138}
    viewBox='0 0 100% 138'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    uniqueKey={index?.toString()} // ⚡ use stable key
    {...props}
  >
    <rect x='0' y='0' rx='10' ry='10' width='100%' height='138' />
  </ContentLoader>
)

export default NftSkeleton
