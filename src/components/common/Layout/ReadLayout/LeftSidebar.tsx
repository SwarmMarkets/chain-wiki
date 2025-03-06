import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import { IpfsIndexPage, NFTWithMetadata } from 'src/shared/utils'
import { ILeftSidebarTreeNode } from './LeftSidebarTreeNode'
import LeftSidebarTree from './LeftSidebarTree'

interface LeftSidebarProps {
  nft: NFTWithMetadata
}

const buildTree = (
  items: IpfsIndexPage[],
  parentId?: number | string
): ILeftSidebarTreeNode[] => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => ({ ...item, children: buildTree(items, item.tokenId) }))
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
