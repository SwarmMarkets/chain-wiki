import clsx from 'clsx'
import { generatePath } from 'react-router-dom'
import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import RoutePaths from 'src/shared/enums/routes-paths'
import { IpfsIndexPage, NFTWithMetadata, splitTokenId } from 'src/shared/utils'
import LeftSidebarSkeleton from './Content/LeftSidebarSkeleton'
import SidebarTree from './SidebarTree'
import { ISidebarTreeNode } from './SidebarTreeNode'

interface LeftSidebarProps {
  nft: NFTWithMetadata | null
  preview?: boolean
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
  const { indexPages, isLoading } = useIpfsIndexPages(nft?.indexPagesUri)
  const treeData = indexPages
    ? buildTree(
        indexPages.map(ip => ({ ...ip, parent: ip.parent || 0 })),
        0
      )
    : []
  const treeDataWithNft: ISidebarTreeNode[] = [
    {
      title: nft?.name || '',
      tokenId: nft?.id || '',
      children: [],
      to: generatePath(RoutePaths.NFT_READ, { nftId: nft?.id || '' }),
    },
    ...treeData,
  ]

  if (isLoading) {
    return <LeftSidebarSkeleton />
  }

  return (
    <aside
      className={clsx(
        'w-1/5 overflow-y-auto sticky top-24)',
        !preview && 'h-screen'
      )}
    >
      {treeDataWithNft.length > 0 ? (
        <SidebarTree data={treeDataWithNft} />
      ) : (
        <p>No data available</p>
      )}
    </aside>
  )
}

export default LeftSidebar
