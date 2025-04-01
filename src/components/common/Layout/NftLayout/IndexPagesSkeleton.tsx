import Skeleton from '../../../ui-kit/Skeleton/Skeleton'

const IndexPagesSkeleton = () => {
  return (
    <div className='p-4 flex flex-col gap-2'>
      <Skeleton
        width='100%'
        height='2rem'
        className='ui-skeleton ui-skeleton-rect'
        count={30}
      />
    </div>
  )
}

export default IndexPagesSkeleton
