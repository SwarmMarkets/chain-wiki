'use client'

import React from 'react'
import EditIndexPagesItem from '../EditIndexPageItem'
import { EditNodeModel } from './types'

const TREE_X_OFFSET = 10

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
  onEdit?: (data: { name: string; slug: string }) => void
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
  treeData,
}) => {
  const indent = depth * TREE_X_OFFSET

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle?.(node.id)
  }

  const firstGroupIndex = treeData.findIndex(n => n.data?.type === 'group')
  const isFirstGroup =
    isGroup &&
    firstGroupIndex === 0 &&
    treeData[firstGroupIndex]?.id === node.id

  return (
    <div
      style={{ marginInlineStart: parent?.data?.type === 'group' ? 0 : indent }}
    >
      <EditIndexPagesItem
        to={isGroup ? '' : to}
        name={node.text}
        slug={node.data?.slug || ''}
        active={active}
        onClick={onClick}
        readonly={readonly}
        onEdit={onEdit}
        isOpen={isOpen}
        isGroup={isGroup}
        onToggle={handleToggle}
        hasChild={hasChild}
        editable={editable}
        depth={depth}
        parent={parent}
        isFirstGroup={isFirstGroup}
      />
    </div>
  )
}

export default Node
