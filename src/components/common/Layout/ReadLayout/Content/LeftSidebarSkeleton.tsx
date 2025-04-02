import Skeleton from 'src/components/ui-kit/Skeleton/Skeleton'

const LeftSidebarSkeleton = () => {
  return (
    <aside className='w-1/5 overflow-y-auto sticky top-24 h-screen'>
      <div className='p-4 flex flex-col gap-2'>
        <Skeleton
          width='100%'
          height='2.5rem'
          count={30}
          className='ui-skeleton ui-skeleton-rect'
        />
      </div>
    </aside>
  )
}

export default LeftSidebarSkeleton
