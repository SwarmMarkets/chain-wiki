import React from 'react'
import Flex from 'src/components/ui/Flex'
import EditIndexPagesItem from '../EditIndexPageItem'
import { EditNodeModel } from './types'
import { useEditingStore } from 'src/shared/store/editing-store'

const TREE_X_OFFSET = 22

const Node: React.FC<{
  to?: string
  node: EditNodeModel
  parent?: EditNodeModel
  depth: number
  isGroup?: boolean
  isOpen: boolean
  readonly?: boolean
  active?: boolean
  editable?: boolean
  treeData: EditNodeModel[]
  hasChild: boolean
  onToggle: (id: EditNodeModel['id']) => void
  onClick: () => void
  onEdit?: (name: string) => void
}> = ({
  to,
  node,
  parent,
  depth,
  isOpen,
  isGroup,
  hasChild,
  onToggle,
  onClick,
  onEdit,
  active = false,
  editable = true,
  readonly = false,
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
      style={{ marginInlineStart: parent?.data?.type === 'group' ? 0 : indent }}
    >
      <Flex justifyContent='space-between'>
        <EditIndexPagesItem
          to={isGroup ? '' : to}
          name={node.text}
          active={active}
          onClick={onClick}
          readonly={readonly}
          onEdit={onEdit}
          isOpen={isOpen}
          isGroup={isGroup}
          onToggle={handleToggle}
          hasChild={hasChild}
          editable={editable}
        />
      </Flex>
    </div>
  )
}

export default Node
