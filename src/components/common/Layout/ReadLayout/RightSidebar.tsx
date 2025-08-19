import clsx from 'clsx'
import React from 'react'
import { generatePath, Link, useParams } from 'react-router-dom'
import Content from 'src/components/common/Layout/ReadLayout/Content'
import Button from 'src/components/ui-kit/Button/Button'
import RoutePaths from 'src/shared/enums/routes-paths'
import { useContentRef } from './Content/context'
import RightSidebarSkeleton from './Content/RightSidebarSkeleton'

interface RightSidebarProps {
  preview?: boolean
  isLoading?: boolean
  firstTokenSlug: string
  className?: string
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  preview,
  isLoading,
  className,
  firstTokenSlug,
}) => {
  const { nftIdOrSlug = '', tokenIdOrSlug = '' } = useParams()

  const { contentElem } = useContentRef()

  if (isLoading) {
    return <RightSidebarSkeleton />
  }

  return (
    <aside
      className={clsx(
        'w-1/6 sticky top-28 self-start',
        !preview && 'max-h-[calc(100vh-9rem)] overflow-y-auto'
      )}
    >
      <div className='mb-4'>
        <Link
          to={generatePath(RoutePaths.TOKEN_READ_HISTORY, {
            nftIdOrSlug,
            tokenIdOrSlug: tokenIdOrSlug || firstTokenSlug,
          })}
          className='no-underline'
        >
          <Button
            variant='contained'
            size='sm'
            color='primary'
            className={className}
          >
            View page history
          </Button>
        </Link>
      </div>
      <Content contentElem={contentElem} />
    </aside>
  )
}

export default RightSidebar
