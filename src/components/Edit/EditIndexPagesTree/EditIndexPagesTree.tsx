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
  const { treeData, updateIndexPagesByTreeNodes, updateTokenName } =
    useEdit(readonly)

  const handleDrop = (newTree: NodeModel[], e: DropOptions) => {
    updateIndexPagesByTreeNodes(newTree)
  }

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className={styles.wrapper}>
        {treeData.length > 0 && (
          <Tree
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
            {...(readonly && { canDrag: () => false, canDrop: () => false })}
            dropTargetOffset={5}
            placeholderRender={(_node, { depth }) => (
              <Placeholder depth={depth} />
            )}
            initialOpen
            render={(node, { depth, isOpen, hasChild, onToggle }) => {
              return (
                <Node
                  onToggle={onToggle}
                  to={to?.(node)}
                  active={activeId === node.id}
                  onEdit={name => updateTokenName(node.id.toString(), name)}
                  hasChild={hasChild}
                  node={node}
                  depth={depth}
                  isOpen={isOpen}
                  readonly={readonly}
                  onClick={() => onClick?.(node.id.toString())}
                  treeData={treeData}
                />
              )
            }}
          />
        )}
      </div>
    </DndProvider>
  )
}

export default EditIndexPagesTree
