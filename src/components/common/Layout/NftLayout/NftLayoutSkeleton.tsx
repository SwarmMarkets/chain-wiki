import Skeleton from '../../../ui-kit/Skeleton/Skeleton'

const NftLayoutSkeleton = () => {
  return (
    <div className='flex flex-col h-screen'>
      <div className='h-16 bg-gray-100'>
        <Skeleton
          width='80%'
          height='1rem'
          className='ui-skeleton ui-skeleton-rect m-4'
        />
      </div>
      <div className='flex flex-1 min-h-0'>
        <div className='w-64 bg-gray-200 p-4'>
          <Skeleton
            width='80%'
            height='1rem'
            count={5}
            className='ui-skeleton ui-skeleton-text mb-2'
          />
        </div>
        <div className='flex flex-col flex-1 min-h-0 p-4'>
          <Skeleton
            width='50%'
            height='2rem'
            className='ui-skeleton ui-skeleton-rect mb-4'
          />
          <Skeleton
            width='80%'
            height='1rem'
            className='ui-skeleton ui-skeleton-rect mb-2'
          />
          <Skeleton
            width='60%'
            height='1rem'
            className='ui-skeleton ui-skeleton-rect mb-2'
          />
          <Skeleton
            width='90%'
            height='1rem'
            className='ui-skeleton ui-skeleton-rect mb-2'
          />
          <Skeleton
            width='70%'
            height='1rem'
            className='ui-skeleton ui-skeleton-rect mb-2'
          />
        </div>
      </div>
    </div>
  )
}

export default NftLayoutSkeleton
