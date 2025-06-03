import Skeleton from 'src/components/ui-kit/Skeleton/Skeleton'

const ReadHeaderSkeleton = () => {
  return (
    <header className='fixed top-0 left-0 z-10 mb-6 bg-gray-50 py-3 w-full'>
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center max-h-10 justify-between'>
        <Skeleton
          width='100px'
          height='48px'
          className='ui-skeleton ui-skeleton-rect self-center'
        />
        <div className='flex gap-6 items-center'>
          <Skeleton
            width='80px'
            height='20px'
            count={3}
            className='ui-skeleton ui-skeleton-rect'
          />
        </div>
      </div>
    </header>
  )
}

export default ReadHeaderSkeleton
