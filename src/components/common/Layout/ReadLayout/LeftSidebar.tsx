import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import Collapse from 'src/components/ui-kit/Animations/Collapse'
import Icon from 'src/components/ui-kit/Icon/Icon'
import IconButton from 'src/components/ui-kit/IconButton'
import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import { IpfsIndexPage, NFTWithMetadata } from 'src/shared/utils'

interface LeftSidebarProps {
  nft: NFTWithMetadata
}

interface ITreeNode extends IpfsIndexPage {
  children: ITreeNode[]
}

const buildTree = (
  items: IpfsIndexPage[],
  parentId?: number | string
): ITreeNode[] => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => ({ ...item, children: buildTree(items, item.tokenId) }))
}

interface TreeNodeProps {
  node: ITreeNode
  selectedId: string | null
  isParentGroup?: boolean
  isChild?: boolean
  onSelect: (id: string) => void
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  selectedId,
  isParentGroup,
  isChild,
  onSelect,
}) => {
  const isGroup = node.type === 'group'
  const isSelected = selectedId === node.tokenId
  const hasChildren = node.children.length > 0

  const [isExpanded, setIsExpanded] = useState(true)

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  return (
    <li>
      <div
        onClick={() => !isGroup && onSelect(node.tokenId)}
        className={clsx(
          'flex justify-between items-center transition-colors',
          {
            'border-l border-gray-300':
              !isGroup && !isParentGroup && node.parent !== 0,
            'border-primary': isSelected,
          },
          isChild && !isParentGroup ? 'rounded-r-md' : 'rounded-md',
          isGroup &&
            'typo-body1 font-bold uppercase mt-6 mb-1 text-main-accent',
          !isGroup &&
            `px-3 py-1.5 cursor-pointer ${
              isSelected
                ? 'hover:bg-primary-muted text-primary'
                : 'hover:bg-gray-100 text-main-accent'
            }`,
          isSelected && 'text-primary'
        )}
      >
        <div>{node.title}</div>
        {hasChildren && !isGroup && (
          <IconButton
            onClick={handleExpand}
            hoverBackground={isSelected ? 'primary-contrast' : 'gray-50'}
          >
            <Icon
              name='chevronRight'
              size={12}
              className={clsx(
                'transition-transform',
                isExpanded ? 'rotate-90' : 'rotate-0'
              )}
            />
          </IconButton>
        )}
      </div>
      {hasChildren && (
        <AnimatePresence>
          {isExpanded && (
            <Collapse>
              <ul
                className={clsx({
                  'ml-3 mt-1 pl-2': !isGroup,
                })}
              >
                {node.children.map(child => (
                  <TreeNode
                    key={child.tokenId}
                    node={child}
                    selectedId={selectedId}
                    onSelect={onSelect}
                    isParentGroup={isGroup}
                    isChild={true}
                  />
                ))}
              </ul>
            </Collapse>
          )}
        </AnimatePresence>
      )}
    </li>
  )
}

interface TreeViewProps {
  data: ITreeNode[]
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <ul>
      {data.map(node => (
        <TreeNode
          key={node.tokenId}
          node={node}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ))}
    </ul>
  )
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ nft }) => {
  const { indexPages } = useIpfsIndexPages(nft.indexPagesUri)
  const treeData = indexPages ? buildTree(indexPages, 0) : []

  return (
    <aside className='p-4 col-span-3'>
      {treeData.length > 0 ? (
        <TreeView data={treeData} />
      ) : (
        <p>No data available</p>
      )}
    </aside>
  )
}

export default LeftSidebar
