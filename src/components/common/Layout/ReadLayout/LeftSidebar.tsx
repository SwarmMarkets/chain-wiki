import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import { IpfsIndexPage, NFTWithMetadata } from 'src/shared/utils'
import { ILeftSidebarTreeNode } from './LeftSidebarTreeNode'
import LeftSidebarTree from './LeftSidebarTree'
import { generatePath } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'

interface LeftSidebarProps {
  nft: NFTWithMetadata
}

const buildTree = (
  items: IpfsIndexPage[],
  parentId?: number | string
): ILeftSidebarTreeNode[] => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => {
      const [nftId] = item.tokenId.split('-')
      return {
        ...item,
        children: buildTree(items, item.tokenId),
        to: generatePath(RoutePaths.TOKEN_READ, {
          tokenId: item.tokenId,
          nftId,
        }),
      }
    })
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ nft }) => {
  const { indexPages } = useIpfsIndexPages(nft.indexPagesUri)
  const treeData = indexPages ? buildTree(indexPages, 0) : []

  return (
    <aside className='p-4 col-span-3'>
      {treeData.length > 0 ? (
        <LeftSidebarTree data={treeData} />
      ) : (
        <p>No data available</p>
      )}
    </aside>
  )
}

export default LeftSidebar
