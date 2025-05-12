import React from 'react'
import clsx from 'clsx'
import {
  generatePath,
  Navigate,
  useNavigate,
  useParams,
} from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import { IpfsIndexPage, NFTWithMetadata, splitTokenId } from 'src/shared/utils'
import LeftSidebarSkeleton from './Content/LeftSidebarSkeleton'
import SidebarTree from './SidebarTree'
import { ISidebarTreeNode } from './SidebarTreeNode'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import { useTranslation } from 'react-i18next'

interface LeftSidebarProps {
  nft: NFTWithMetadata | null
  preview?: boolean
}

const findFirstNonGroupTokenId = (
  nodes: ISidebarTreeNode[]
): string | undefined => {
  for (const node of nodes) {
    if (node.type !== 'group') {
      return node.tokenId
    }
    const childResult = findFirstNonGroupTokenId(node.children || [])
    if (childResult) {
      return childResult
    }
  }
  return undefined
}

const buildTree = (
  items: IpfsIndexPage[],
  parentId?: number | string
): ISidebarTreeNode[] => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => {
      const [nftId] = item.tokenId.split('-')
      const to =
        item.type === 'group'
          ? undefined
          : generatePath(RoutePaths.TOKEN_READ, {
              tokenId: splitTokenId(item.tokenId).tokenId,
              nftId,
            })

      return {
        ...item,
        children: buildTree(items, item.tokenId),
        to,
      }
    })
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ nft, preview }) => {
  const { t } = useTranslation('contents')
  const { tokenId } = useParams()
  const fullTokenId = useFullTokenIdParam()
  const navigate = useNavigate()

  const treeData = nft?.indexPagesContent?.indexPages
    ? buildTree(
        nft?.indexPagesContent?.indexPages.map(ip => ({
          ...ip,
          parent: ip.parent || 0,
        })),
        0
      )
    : []

  if (!nft?.indexPagesContent?.indexPages) {
    return <LeftSidebarSkeleton />
  }

  const firstTokenId = findFirstNonGroupTokenId(treeData)

  if (!tokenId && nft?.id && firstTokenId && !preview) {
    return (
      <Navigate
        to={generatePath(RoutePaths.TOKEN_READ, {
          tokenId: splitTokenId(firstTokenId).tokenId,
          nftId: nft?.id,
        })}
        replace
      />
    )
  }
  return (
    <aside
      className={clsx(
        'w-1/5 sticky top-28 self-start text-main z-10 flex flex-col',
        !preview && 'max-h-[calc(100vh-9rem)]'
      )}
      style={{ height: 'calc(100vh - 6rem)' }}
    >
      <div className={clsx('flex-grow overflow-y-auto pr-2')}>
        {treeData.length > 0 ? (
          <SidebarTree
            data={treeData}
            onSelect={id => {
              navigate(
                generatePath(RoutePaths.TOKEN_READ, {
                  tokenId: id,
                  nftId: splitTokenId(id).nftId,
                })
              )
            }}
            selectedId={fullTokenId}
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
