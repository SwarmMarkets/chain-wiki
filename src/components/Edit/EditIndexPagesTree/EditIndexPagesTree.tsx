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
import { useEditingStore } from 'src/shared/store/editing-store'
import { Link } from 'react-router-dom'

interface EditIndexPagesTreeProps {
  onClick?: (id: string) => void
  readonly?: boolean
  to?: (node: NodeModel) => string
}

const EditIndexPagesTree: React.FC<EditIndexPagesTreeProps> = ({
  readonly = false,
  to,
  onClick,
}) => {
  const { ref, getPipeHeight, toggle } = useTreeOpenHandler()
  const { treeData, updateIndexPagesByTreeNodes, updateTokenName } =
    useEdit(readonly)

  const { currEditableToken } = useEditingStore()

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
          initialOpen={true}
          render={(node, { depth, isOpen, isDropTarget, hasChild }) => {
            const NodeComponent = () => (
              <Node
                active={currEditableToken?.id === node.id}
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

            return to ? (
              <Link to={to?.(node)}>
                <NodeComponent />
              </Link>
            ) : (
              <NodeComponent />
            )
          }}
        />
      </div>
    </DndProvider>
  )
}

export default EditIndexPagesTree
