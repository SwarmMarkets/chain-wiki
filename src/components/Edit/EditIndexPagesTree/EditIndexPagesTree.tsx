import {
  DndProvider,
  DropOptions,
  getBackendOptions,
  MultiBackend,
  Tree,
} from '@minoru/react-dnd-treeview'
import React from 'react'
import useEdit from '../useEdit'
import { isHiddenList } from '../utils'
import Node from './Node'
import Placeholder from './Placeholder'
import styles from './styles.module.css'
import { EditNodeModel, EditNodeModelData } from './types'
import clsx from 'clsx'

interface EditIndexPagesTreeProps {
  onClick?: (id: string) => void
  readonly?: boolean
  activeId?: string
  to?: (node: EditNodeModel) => string
}

const EditIndexPagesTree: React.FC<EditIndexPagesTreeProps> = ({
  readonly = false,
  to,
  activeId,
  onClick,
}) => {
  const { treeData, updateIndexPagesByTreeNodes, updateTokenName } =
    useEdit(readonly)

  const handleDrop = (
    newTree: EditNodeModel[],
    e: DropOptions<EditNodeModelData>
  ) => {
    if (e.dropTargetId === e.dragSourceId) return
    if (
      e.dragSource?.data?.type === 'group' &&
      e.dropTargetId !== 0 &&
      !isHiddenList(e.dropTargetId.toString())
    )
      return
    updateIndexPagesByTreeNodes(newTree)
  }

  if (!treeData.length) {
    return null
  }

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className={styles.wrapper + 'text-prima'}>
        <Tree
          classes={{
            root: clsx(styles.treeRoot),
            placeholder: styles.placeholder,
            dropTarget: styles.dropTarget,
            listItem: styles.listItem,
          }}
          tree={treeData}
          sort={false}
          rootId={0}
          insertDroppableFirst={false}
          enableAnimateExpand={true}
          onDrop={handleDrop}
          canDrop={() => true}
          {...(readonly && { canDrag: () => false, canDrop: () => false })}
          dropTargetOffset={5}
          placeholderRender={(node, { depth }) => (
            <Placeholder
              depth={depth}
              parent={treeData.find(t => t.id === node.parent)}
            />
          )}
          initialOpen
          render={(node, { depth, isOpen, hasChild, onToggle }) => {
            return (
              <Node
                parent={treeData.find(t => t.id === node.parent)}
                onToggle={onToggle}
                editable={!isHiddenList(node.id.toString())}
                to={to?.(node)}
                active={activeId === node.id}
                onEdit={name => updateTokenName(node.id.toString(), name)}
                hasChild={hasChild}
                node={node}
                depth={depth}
                isOpen={isOpen}
                isGroup={node.data?.type === 'group'}
                readonly={readonly}
                onClick={() => onClick?.(node.id.toString())}
                treeData={treeData}
              />
            )
          }}
        />
      </div>
    </DndProvider>
  )
}

export default EditIndexPagesTree
