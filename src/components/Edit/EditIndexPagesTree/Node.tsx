import { NodeModel } from '@minoru/react-dnd-treeview'
import React from 'react'
import Flex from 'src/components/ui/Flex'
import EditIndexPagesItem from '../EditIndexPageItem'

const TREE_X_OFFSET = 22

const Node: React.FC<{
  to?: string
  node: NodeModel
  depth: number
  isOpen: boolean
  isDropTarget: boolean
  readonly?: boolean
  active?: boolean
  treeData: NodeModel[]
  hasChild: boolean
  onToggle: (id: NodeModel['id']) => void
  onClick: () => void
  onEdit?: (name: string) => void
  getPipeHeight: (id: string | number, treeData: NodeModel[]) => number
}> = ({
  to,
  node,
  depth,
  isOpen,
  hasChild,
  isDropTarget,
  onToggle,
  onClick,
  onEdit,
  active = false,
  readonly = false,
  treeData,
  getPipeHeight,
}) => {
  const indent = depth * TREE_X_OFFSET

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle?.(node.id)
  }

  return (
    <div
      // className={`${styles.nodeWrapper} tree-node ${
      //   node.droppable && isDropTarget ? styles.dropTarget : ''
      // }`}
      style={{ marginInlineStart: indent }}
    >
      <Flex justifyContent='space-between'>
        <EditIndexPagesItem
          to={to}
          name={node.text}
          active={active}
          onClick={onClick}
          readonly={readonly}
          onEdit={onEdit}
          isOpen={isOpen}
          onToggle={handleToggle}
          hasChild={hasChild}
        />
      </Flex>
    </div>
  )
}

export default Node
