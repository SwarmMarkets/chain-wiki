import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Collapse from 'src/components/ui-kit/Animations/Collapse'
import Icon from 'src/components/ui-kit/Icon/Icon'
import IconButton from 'src/components/ui-kit/IconButton'
import { IpfsIndexPage } from 'src/shared/utils'

export interface ILeftSidebarTreeNode extends IpfsIndexPage {
  children: ILeftSidebarTreeNode[]
}

interface LeftSidebarTreeNodeProps {
  node: ILeftSidebarTreeNode
  selectedId: string | null
  isParentGroup?: boolean
  isChild?: boolean
  onSelect: (id: string) => void
}

const LeftSidebarTreeNode: React.FC<LeftSidebarTreeNodeProps> = ({
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
          'group flex justify-between items-center transition-colors',
          {
            'border-l border-gray-300':
              !isGroup && !isParentGroup && node.parent !== 0,
            'border-primary': isSelected,
          },
          isChild && !isParentGroup ? 'rounded-r-md' : 'rounded-md',

          !isGroup &&
            `px-3 py-1.5 cursor-pointer ${
              isSelected ? 'hover:bg-primary-muted ' : 'hover:bg-gray-100 '
            }`
        )}
      >
        <div
          className={clsx(
            isGroup
              ? 'typo-body1 font-bold uppercase mt-6 mb-1 text-main-accent'
              : clsx('text-main', isSelected && 'text-primary')
          )}
        >
          {node.title}
        </div>
        {hasChildren && !isGroup && (
          <IconButton
            onClick={handleExpand}
            hoverBackground={isSelected ? 'primary-contrast' : 'gray-50'}
          >
            <Icon
              name='chevronRight'
              size={10}
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
                  <LeftSidebarTreeNode
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

export default LeftSidebarTreeNode
