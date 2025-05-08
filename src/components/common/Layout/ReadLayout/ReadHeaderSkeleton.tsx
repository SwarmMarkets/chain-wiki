import Skeleton from 'src/components/ui-kit/Skeleton/Skeleton'

const ReadHeaderSkeleton = () => {
  return (
    <header className='bg-gray-50 py-3 w-full'>
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center max-h-10 justify-between'>
        <Skeleton
          width='100px'
          height='3rem'
          className='ui-skeleton ui-skeleton-rect self-center'
        />
        <div className='flex gap-8 items-center'>
          <Skeleton
            width='80px'
            height='1.5rem'
            className='ui-skeleton ui-skeleton-rect'
          />
          <Skeleton
            width='80px'
            height='1.5rem'
            className='ui-skeleton ui-skeleton-rect'
          />
          <Skeleton
            width='80px'
            height='1.5rem'
            className='ui-skeleton ui-skeleton-rect'
          />
          <Skeleton
            width='180px'
            height='3.5rem'
            className='ui-skeleton ui-skeleton-rounded self-center'
          />
        </div>
      </div>
    </header>
  )
}

export default ReadHeaderSkeleton
