import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from 'src/components/ui-kit/Icon/Icon'
import {
  getExplorerUrl,
  NFTWithMetadata,
  TokensQueryFullData,
} from 'src/shared/utils'
import LeftSidebarSkeleton from './Content/LeftSidebarSkeleton'
import SidebarTree from './SidebarTree'
import { ISidebarTreeNode } from './SidebarTreeNode'
import { buildTree } from './utils'

interface LeftSidebarProps {
  nft: NFTWithMetadata | null
  preview?: boolean
  onSelect?: (node: ISidebarTreeNode) => void
  className?: string
  token?: TokensQueryFullData | null
  chainParam?: string
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  nft,
  preview,
  className,
  token,
  onSelect,
  chainParam
}) => {
  const { t } = useTranslation('layout')

  const treeData = nft?.indexPagesContent?.indexPages
    ? buildTree(
        nft?.indexPagesContent?.indexPages.map(ip => ({
          ...ip,
          parent: ip.parent || 0,
        })),
        nft.slug || '',
        0,
        chainParam
      )
    : []

  if (!nft?.indexPagesContent?.indexPages) {
    return <LeftSidebarSkeleton />
  }

  const explorerUrl = getExplorerUrl({
    type: 'address',
    hash: nft.id,
  })

  let explorerName = 'Explorer'
  if (explorerUrl.includes('polygonscan')) {
    explorerName = 'Polygonscan'
  } else if (explorerUrl.includes('basescan')) {
    explorerName = 'Basescan'
  }

  return (
    <aside
      className={clsx(
        'self-start text-main z-10 flex flex-col xs:w-full md:w-1/3 xl:w-1/5 sticky top-28',
        className
      )}
      style={{ height: `calc(100vh - ${preview ? 20 : 9}rem)` }}
    >
      <div className='flex-grow overflow-y-auto pr-2'>
        {treeData.length > 0 ? (
          <SidebarTree
            data={treeData}
            selectedId={token?.id || ''}
            onSelect={onSelect}
          />
        ) : (
          <p className='text-body2 px-4 py-2'>{t('noDataAvailable')}</p>
        )}
      </div>

      <div className='mt-auto flex flex-col gap-2 p-3'>
        <a
          href={explorerUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-gray-400 hover:text-primary no-underline inline-flex items-center gap-1'
        >
          <Icon name='external-link' size={14} className='text-inherit' />
          {t('sidebar.viewOnExplorer', { explorerName })}
        </a>
        <a
          href='https://www.chainwiki.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-gray-400 hover:text-primary no-underline inline-flex items-center gap-1'
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
