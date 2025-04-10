import clsx from 'clsx'
import {
  generatePath,
  Navigate,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import RoutePaths from 'src/shared/enums/routes-paths'
import { IpfsIndexPage, NFTWithMetadata, splitTokenId } from 'src/shared/utils'
import LeftSidebarSkeleton from './Content/LeftSidebarSkeleton'
import SidebarTree from './SidebarTree'
import { ISidebarTreeNode } from './SidebarTreeNode'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'

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
  const { tokenId } = useParams()
  const fullTokenId = useFullTokenIdParam()
  const navigate = useNavigate()

  const { indexPages, isLoading } = useIpfsIndexPages(nft?.indexPagesUri)
  const treeData = indexPages
    ? buildTree(
        indexPages.map(ip => ({ ...ip, parent: ip.parent || 0 })),
        0
      )
    : []

  if (isLoading) {
    return <LeftSidebarSkeleton />
  }

  const firstTokenId = findFirstNonGroupTokenId(treeData)

  if (!tokenId && nft?.id && firstTokenId)
    return (
      <Navigate
        to={generatePath(RoutePaths.TOKEN_READ, {
          tokenId: splitTokenId(firstTokenId).tokenId,
          nftId: nft?.id,
        })}
      />
    )

  return (
    <aside
      className={clsx(
        'w-1/5 overflow-y-auto sticky top-24)',
        !preview && 'h-screen'
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
          selectedId={fullTokenId}
        />
      ) : (
        <p>No data available</p>
      )}
    </aside>
  )
}

export default LeftSidebar
