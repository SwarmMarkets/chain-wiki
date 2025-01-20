import {
  DndProvider,
  DropOptions,
  getBackendOptions,
  MultiBackend,
  NodeModel,
  Tree,
} from '@minoru/react-dnd-treeview'
import React from 'react'
import useEdit from '../useEdit'
import Node from './Node'
import Placeholder from './Placeholder'
import styles from './styles.module.css'
import useTreeOpenHandler from './useTreeOpenHandler'
import { isHiddenList } from '../utils'

interface EditIndexPagesTreeProps {
  onClick?: (id: string) => void
  readonly?: boolean
  activeId?: string
  to?: (node: NodeModel) => string
}

const EditIndexPagesTree: React.FC<EditIndexPagesTreeProps> = ({
  readonly = false,
  to,
  activeId,
  onClick,
}) => {
  const { ref, getPipeHeight, toggle } = useTreeOpenHandler()
  const { treeData, updateIndexPagesByTreeNodes, updateTokenName } =
    useEdit(readonly)

  const handleDrop = (newTree: NodeModel[], e: DropOptions) => {
    updateIndexPagesByTreeNodes(newTree)
  }

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className={styles.wrapper}>
        <Tree
          ref={ref}
          classes={{
            root: styles.treeRoot,
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
          canDrop={() => (readonly ? false : true)}
          dropTargetOffset={5}
          placeholderRender={(node, { depth }) => (
            <Placeholder node={node} depth={depth} />
          )}
          render={(node, { depth, isOpen, isDropTarget, hasChild }) => {
            return (
              <Node
                to={to?.(node)}
                active={activeId === node.id}
                editable={!isHiddenList(node.id.toString())}
                onToggle={id => toggle(id)}
                onEdit={name => updateTokenName(node.id.toString(), name)}
                hasChild={hasChild}
                getPipeHeight={getPipeHeight}
                node={node}
                depth={depth}
                isOpen={isOpen}
                readonly={readonly}
                onClick={() => onClick?.(node.id.toString())}
                isDropTarget={isDropTarget}
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
