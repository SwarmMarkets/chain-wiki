import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import { IpfsIndexPage, NFTWithMetadata } from 'src/shared/utils'
import { generatePath } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import SidebarTree from './SidebarTree'
import { ISidebarTreeNode } from './SidebarTreeNode'

interface LeftSidebarProps {
  nft: NFTWithMetadata | null
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

const LeftSidebar: React.FC<LeftSidebarProps> = ({ nft }) => {
  const { indexPages } = useIpfsIndexPages(nft?.indexPagesUri)
  const treeData = indexPages ? buildTree(indexPages, 0) : []

  return (
    <aside className='w-1/5 h-screen overflow-y-auto sticky top-24'>
      {treeData.length > 0 ? (
        <SidebarTree data={treeData} />
      ) : (
        <p>No data available</p>
      )}
    </aside>
  )
}

export default LeftSidebar
