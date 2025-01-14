import { NodeModel } from '@minoru/react-dnd-treeview'
import React from 'react'
import Flex from 'src/components/ui/Flex'
import { useEditingStore } from 'src/shared/store/editing-store'
import EditIndexPagesItem from '../EditIndexPageItem'
import useEdit from '../useEdit'

const TREE_X_OFFSET = 22

const Node: React.FC<{
  node: NodeModel
  depth: number
  isOpen: boolean
  isDropTarget: boolean
  treeData: NodeModel[]
  hasChild: boolean
  onClick: (id: NodeModel['id']) => void
  getPipeHeight: (id: string | number, treeData: NodeModel[]) => number
}> = ({
  node,
  depth,
  isOpen,
  hasChild,
  isDropTarget,
  onClick,
  treeData,
  getPipeHeight,
}) => {
  const indent = depth * TREE_X_OFFSET
  const { fullTokens, updateTokenName } = useEdit()
  const { currEditableToken, updateCurrEditableToken } = useEditingStore()
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick(node.id)
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
          name={node.text}
          active={currEditableToken?.id === node.id}
          onClick={() =>
            updateCurrEditableToken(
              fullTokens?.find(t => t.id === node.id) || null
            )
          }
          onEdit={name => updateTokenName(node.id.toString(), name)}
          isOpen={isOpen}
          onToggle={handleToggle}
          hasChild={hasChild}
        ></EditIndexPagesItem>
      </Flex>
    </div>
  )
}

export default Node
