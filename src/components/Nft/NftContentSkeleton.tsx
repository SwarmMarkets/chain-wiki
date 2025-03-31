import Skeleton from '../ui-kit/Skeleton/Skeleton'

const NftContentSkeleton = () => {
  return (
    <div className='w-full flex flex-col gap-4'>
      <Skeleton
        width='50%'
        height='2rem'
        className='ui-skeleton ui-skeleton-rect'
      />
      <Skeleton
        width='80%'
        height='1rem'
        className='ui-skeleton ui-skeleton-rect'
      />
      <Skeleton
        width='60%'
        height='1rem'
        className='ui-skeleton ui-skeleton-rect'
      />
      <Skeleton
        width='90%'
        height='1rem'
        className='ui-skeleton ui-skeleton-rect'
      />
      <Skeleton
        width='70%'
        height='1rem'
        className='ui-skeleton ui-skeleton-rect'
      />
    </div>
  )
}

export default NftContentSkeleton
