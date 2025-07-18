import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import { NFTWithMetadata } from 'src/shared/utils'
import LeftSidebarSkeleton from './Content/LeftSidebarSkeleton'
import SidebarTree from './SidebarTree'
import { ISidebarTreeNode } from './SidebarTreeNode'
import { buildTree } from './utils'

interface LeftSidebarProps {
  nft: NFTWithMetadata | null
  preview?: boolean
  firstTokenId: string
  onSelect?: (node: ISidebarTreeNode) => void
  className?: string
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  nft,
  preview,
  firstTokenId,
  className,
  onSelect,
}) => {
  const { t } = useTranslation('layout')
  const fullTokenId = useFullTokenIdParam()

  const treeData = nft?.indexPagesContent?.indexPages
    ? buildTree(
        nft?.indexPagesContent?.indexPages.map(ip => ({
          ...ip,
          parent: ip.parent || 0,
        })),
        nft.slug || '',
        0
      )
    : []

  if (!nft?.indexPagesContent?.indexPages) {
    return <LeftSidebarSkeleton />
  }

  return (
    <aside
      className={clsx(
        'self-start text-main z-10 flex flex-col xs:w-full md:w-1/3 xl:w-1/5 sticky top-28',
        className
      )}
      style={{ height: `calc(100vh - ${preview ? 20 : 9}rem)` }}
    >
      <div className={clsx('flex-grow overflow-y-auto pr-2')}>
        {treeData.length > 0 ? (
          <SidebarTree
            data={treeData}
            selectedId={fullTokenId || firstTokenId}
            onSelect={onSelect}
          />
        ) : (
          <p className='text-body2 px-4 py-2'>{t('noDataAvailable')}</p>
        )}
      </div>
      <div className='p-3'>
        <a
          href='https://www.chainwiki.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-gray-400 no-underline hover:text-primary inline-flex items-center gap-1'
        >
          <img
            src='/assets/icon-logo.png'
            alt='ChainWiki Icon'
            className='w-4 h-4 object-contain'
          />
          {t('createdWithChainWiki')}
        </a>
      </div>
    </aside>
  )
}

export default LeftSidebar
