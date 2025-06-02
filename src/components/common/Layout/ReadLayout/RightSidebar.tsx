import clsx from 'clsx'
import React from 'react'
import Content from 'src/components/common/Layout/ReadLayout/Content'
import RightSidebarSkeleton from './Content/RightSidebarSkeleton'
import { useParams, generatePath, Link } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import Button from 'src/components/ui-kit/Button/Button'
import { splitTokenId } from 'src/shared/utils'
import { useContentRef } from './ContentContext'

interface RightSidebarProps {
  preview?: boolean
  isLoading?: boolean
  firstTokenId: string
  className?: string
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  preview,
  isLoading,
  className,
  firstTokenId,
}) => {
  const { nftId, tokenId } = useParams<{ nftId?: string; tokenId?: string }>()

  const currentNftId = nftId ?? null
  const currentTokenId = tokenId ?? null

  const historyPath =
    currentNftId && currentTokenId
      ? generatePath(RoutePaths.TOKEN_READ_HISTORY, {
          nftId: currentNftId,
          tokenIdOrSlug: currentTokenId || splitTokenId(firstTokenId).tokenId,
        })
      : ''

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
        {currentNftId && historyPath ? (
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
