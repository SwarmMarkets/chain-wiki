import clsx from 'clsx'
import React from 'react'
import Content from 'src/components/common/Layout/ReadLayout/Content'
import LinkPreserveSearch from 'src/components/LinkPreserveSearch'
import Button from 'src/components/ui-kit/Button/Button'
import { useContentRef } from './Content/context'
import RightSidebarSkeleton from './Content/RightSidebarSkeleton'
import { useParams } from 'next/navigation'
import Routes, { ReadParams } from 'src/shared/consts/routes'

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
  const params = useParams<ReadParams['token']>()
  const { nftIdOrSlug, tokenIdOrSlug } = useParams<ReadParams['token']>()

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
        <LinkPreserveSearch
          href={Routes.read.history(
            nftIdOrSlug,
            tokenIdOrSlug || firstTokenSlug,
            params.chain
          )}
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
        </LinkPreserveSearch>
      </div>
      <Content contentElem={contentElem} />
    </aside>
  )
}

export default RightSidebar
