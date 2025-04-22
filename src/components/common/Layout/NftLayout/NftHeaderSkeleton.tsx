import Skeleton from '../../../ui-kit/Skeleton/Skeleton'

const NftHeaderSkeleton = () => {
  return (
    <header className='bg-paper px-4 py-2 border-b border-gray-200 flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <Skeleton
          width='100px'
          height='2rem'
          className='ui-skeleton ui-skeleton-rect'
        />
        <Skeleton
          width='100px'
          height='2rem'
          className='ui-skeleton ui-skeleton-rect'
        />
        <Skeleton
          width='80px'
          height='2rem'
          className='ui-skeleton ui-skeleton-rect'
        />
      </div>
      <div className='flex gap-2 items-center'>
        <Skeleton
          width='80px'
          height='2rem'
          className='ui-skeleton ui-skeleton-rect'
        />
        <Skeleton
          width='80px'
          height='2rem'
          className='ui-skeleton ui-skeleton-rect'
        />
      </div>
    </header>
  )
}

export default NftHeaderSkeleton
