import React, { forwardRef } from 'react'
import clsx from 'clsx'
import useInfiniteScroll from 'src/common/hooks/helpers/useInfiniteScroll'
import { useTranslation } from 'react-i18next'
import './styles.css'
import { useInfiniteListContext } from './InviteListContext'

interface InfiniteListProps {
  children: React.ReactNode[]
  noResults?: React.ReactNode
  loader?: React.ReactNode
  className?: string
}

const InfiniteList = forwardRef<HTMLDivElement, InfiniteListProps>(
  ({ children, noResults, loader, className }: InfiniteListProps, ref) => {
    const { hasMore, loading, loadMore } = useInfiniteListContext()
    const { t } = useTranslation('infiniteList')

    const loaderRef = useInfiniteScroll<HTMLDivElement>({
      hasMore,
      loadMore,
    })

    return (
      <div className={clsx('flex flex-col overflow-auto', className)} ref={ref}>
        <div className='flex flex-col space-y-2'>
          {loading === false && children.length === 0
            ? noResults
            : children.map((child, index) => <div key={index}>{child}</div>)}

          {loading && (loader ?? <div className='py-2'>{t('loading')}</div>)}

          {/* Use the loaderRef to trigger loadMore when visible */}
          <div ref={loaderRef} />
        </div>
      </div>
    )
  }
)

InfiniteList.displayName = 'InfiniteList'

export default InfiniteList
