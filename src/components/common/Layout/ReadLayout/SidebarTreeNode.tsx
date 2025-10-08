import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import DynamicComponent from 'src/components/DynamicComponent'
import LinkPreserveSearch from 'src/components/LinkPreserveSearch'
import Collapse from 'src/components/ui-kit/Animations/Collapse'
import Icon from 'src/components/ui-kit/Icon/Icon'
import IconButton from 'src/components/ui-kit/IconButton'
import { IpfsIndexPage } from 'src/shared/utils'

export interface ISidebarTreeNode extends IpfsIndexPage {
  children: ISidebarTreeNode[]
  to?: string
}

interface SidebarTreeNodeProps {
  node: ISidebarTreeNode
  selectedId: string | null
  isParentGroup?: boolean
  isChild?: boolean
  onSelect?: (node: ISidebarTreeNode) => void
  className?: string
}

const SidebarTreeNode: React.FC<SidebarTreeNodeProps> = ({
  node,
  selectedId,
  isParentGroup = false,
  isChild = false,
  onSelect,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const isGroup = node.type === 'group'
  const isSelected = selectedId === node.tokenId
  const hasChildren = node.children.length > 0

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsExpanded(prev => !prev)
  }

  return (
    <li className='list-none'>
      <DynamicComponent
        as={node?.to ? LinkPreserveSearch : 'div'}
        href={node?.to}
        onClick={() => !isGroup && onSelect?.(node)}
        className={clsx(
          'group flex justify-between items-center transition-colors px-3 py-1.5',
          {
            'border-l border-gray-300': !isGroup && !isParentGroup && isChild,
            'border-primary': isSelected,
            'hover:bg-primary-muted': isSelected && !isGroup,
            'hover:bg-gray-100': !isSelected && !isGroup,
            'cursor-pointer': !isGroup,
          },
          isChild && !isParentGroup ? 'rounded-r-md' : 'rounded-md',
          className
        )}
      >
        <div
          className={clsx(
            'text-main',
            isGroup && 'typo-body1 font-bold uppercase mt-6 text-main-accent',
            isSelected && 'text-primary'
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
              className={clsx('transition-transform', {
                'rotate-90': isExpanded,
                'rotate-0': !isExpanded,
              })}
            />
          </IconButton>
        )}
      </DynamicComponent>
      {hasChildren && (
        <AnimatePresence>
          {isExpanded && (
            <Collapse>
              <ul className={clsx(!isGroup && 'ml-5 my-1')}>
                {node.children.map(child => (
                  <SidebarTreeNode
                    key={child.tokenId}
                    node={child}
                    selectedId={selectedId}
                    onSelect={onSelect}
                    isParentGroup={isGroup}
                    isChild
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

export default SidebarTreeNode
