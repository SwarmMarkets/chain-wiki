import clsx from 'clsx'
import React from 'react'
import Content from 'src/components/common/Layout/ReadLayout/Content'
import RightSidebarSkeleton from './Content/RightSidebarSkeleton'

interface RightSidebarProps {
  contentElem: HTMLDivElement | null
  preview?: boolean
  isLoading?: boolean
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  contentElem,
  preview,
  isLoading,
}) => {
  if (isLoading || !contentElem) {
    return <RightSidebarSkeleton />
  }

  return (
    <aside
      className={clsx(
        'w-1/6 overflow-y-auto sticky top-24',
        !preview && 'h-screen'
      )}
    >
      <Content contentElem={contentElem} />
    </aside>
  )
}

export default RightSidebar
