import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import { IpfsIndexPage, NFTWithMetadata } from 'src/shared/utils'
import { generatePath } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import SidebarTree from './SidebarTree'
import SidebarTreeNode, { ISidebarTreeNode } from './SidebarTreeNode'
import clsx from 'clsx'

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
              tokenId: item.tokenId,
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
  const { indexPages } = useIpfsIndexPages(nft?.indexPagesUri)
  const treeData = indexPages
    ? buildTree(
        [{ title: nft?.name || '', tokenId: nft?.id || '' }, ...indexPages],
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

  return (
    <aside
      className={clsx(
        'w-1/5 overflow-y-auto sticky top-24)',
        !preview && 'h-screen'
      )}
    >
      {treeData.length > 0 ? (
        <SidebarTree data={treeDataWithNft} />
      ) : (
        <p>No data available</p>
      )}
    </aside>
  )
}

export default LeftSidebar
