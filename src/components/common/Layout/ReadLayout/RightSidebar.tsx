import clsx from 'clsx'
import React from 'react'
import Content from 'src/components/common/Layout/ReadLayout/Content'
import RightSidebarSkeleton from './Content/RightSidebarSkeleton'
import { useParams, generatePath, Link } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import Button from 'src/components/ui-kit/Button/Button'

interface RightSidebarProps {
  contentElem: HTMLDivElement | null
  preview?: boolean
  isLoading?: boolean
  className?: string
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  contentElem,
  preview,
  isLoading,
  className,
}) => {
  const { nftId, tokenId } = useParams<{ nftId?: string; tokenId?: string }>()

  const currentNftId = nftId ?? null
  const currentTokenId = tokenId ?? null

  const historyPath =
    currentNftId && currentTokenId
      ? generatePath(RoutePaths.TOKEN_READ_HISTORY, {
          nftId: currentNftId,
          tokenId: currentTokenId,
        })
      : ''

  if (isLoading) {
    return <RightSidebarSkeleton />
  }

  return (
    <aside
      className={clsx(
        'w-1/6 sticky top-24 self-start',
        !preview && 'max-h-[calc(100vh-6rem)] overflow-y-auto'
      )}
    >
      <div className='mb-4'>
        {currentNftId && currentTokenId && historyPath ? (
          <Link to={historyPath} className='no-underline'>
            <Button
              variant='contained'
              size='sm'
              color='primary'
              className={className}
            >
              View page history
            </Button>
          </Link>
        ) : null}
      </div>
      <Content contentElem={contentElem} />
    </aside>
  )
}

export default RightSidebar
