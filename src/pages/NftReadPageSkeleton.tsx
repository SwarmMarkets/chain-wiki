import Skeleton from 'src/components/ui-kit/Skeleton/Skeleton'

const NftReadPageSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton
        width='100%'
        height='3rem'
        className='ui-skeleton ui-skeleton-rect'
      />
      <Skeleton
        width='100%'
        height='2rem'
        className='ui-skeleton ui-skeleton-rect'
      />
      <Skeleton
        width='100%'
        height='2rem'
        className='ui-skeleton ui-skeleton-rect'
      />
      <Skeleton
        width='100%'
        height='2rem'
        className='ui-skeleton ui-skeleton-rect'
      />
      <Skeleton
        width='100%'
        height='65rem'
        className='ui-skeleton ui-skeleton-rect'
      />
    </div>
  )
}

export default NftReadPageSkeleton
