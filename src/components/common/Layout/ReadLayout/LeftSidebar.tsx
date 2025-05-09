import clsx from 'clsx'
import { generatePath, useNavigate } from 'react-router-dom'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import RoutePaths from 'src/shared/enums/routes-paths'
import { IpfsIndexPage, NFTWithMetadata, splitTokenId } from 'src/shared/utils'
import LeftSidebarSkeleton from './Content/LeftSidebarSkeleton'
import SidebarTree from './SidebarTree'
import { ISidebarTreeNode } from './SidebarTreeNode'

interface LeftSidebarProps {
  nft: NFTWithMetadata | null
  preview?: boolean
  firstTokenId: string
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

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  nft,
  preview,
  firstTokenId,
}) => {
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

  return (
    <aside
      className={clsx(
        'w-1/5 sticky top-24 self-start',
        !preview && 'max-h-[calc(100vh-6rem)] overflow-y-auto'
      )}
    >
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
          selectedId={fullTokenId || firstTokenId}
        />
      ) : (
        <p>No data available</p>
      )}
    </aside>
  )
}

export default LeftSidebar
