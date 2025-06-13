import Skeleton from '../../../ui-kit/Skeleton/Skeleton'

const NftSideBarSkeleton = () => {
  return (
    <div className='p-4 flex flex-col gap-2 w-[300px]'>
      <Skeleton
        width='100%'
        height='2rem'
        className='ui-skeleton ui-skeleton-rect'
        count={30}
      />
    </div>
  )
}

export default NftSideBarSkeleton
