import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import RoutePaths from 'src/shared/enums/routes-paths'
import { IpfsIndexPage, NFTWithMetadata } from 'src/shared/utils'
import LeftSidebarSkeleton from './Content/LeftSidebarSkeleton'
import SidebarTree from './SidebarTree'
import { ISidebarTreeNode } from './SidebarTreeNode'

interface LeftSidebarProps {
  nft: NFTWithMetadata | null
  preview?: boolean
  firstTokenId: string
  isMobile?: boolean
  onClose?: () => void
  className?: string
}

const buildTree = (
  items: IpfsIndexPage[],
  nftSlug: string,
  parentId?: number | string
): ISidebarTreeNode[] => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => {
      const to =
        item.type === 'group'
          ? undefined
          : generatePath(RoutePaths.TOKEN_READ, {
              tokenIdOrSlug: item.slug,
              nftIdOrSlug: nftSlug,
            })

      return {
        ...item,
        children: buildTree(items, nftSlug, item.tokenId),
        to,
      }
    })
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  nft,
  preview,
  firstTokenId,
  className,
  onClose,
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
        'w-1/5 sticky top-28 self-start text-main z-10 flex flex-col',
        !preview && 'max-h-[calc(100vh-9rem)]',
        className
      )}
      style={{ height: 'calc(100vh - 6rem)' }}
    >
      <div className={clsx('flex-grow overflow-y-auto pr-2')}>
        {treeData.length > 0 ? (
          <SidebarTree
            data={treeData}
            selectedId={fullTokenId || firstTokenId}
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
