import Skeleton from 'src/components/ui-kit/Skeleton/Skeleton'

const NftContentSkeleton = () => {
  return (
    <div className='w-full flex flex-col gap-4'>
      <Skeleton
        width='100%'
        height='3rem'
        className='ui-skeleton ui-skeleton-rect'
      />
      <Skeleton
        width='100'
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
        height='50rem'
        className='ui-skeleton ui-skeleton-rect'
      />
    </div>
  )
}

export default NftContentSkeleton
