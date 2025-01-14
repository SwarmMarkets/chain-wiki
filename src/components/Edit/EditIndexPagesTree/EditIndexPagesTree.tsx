import {
  DndProvider,
  DropOptions,
  getBackendOptions,
  getDescendants,
  MultiBackend,
  Tree,
  NodeModel,
} from '@minoru/react-dnd-treeview'
import Node from './Node'
import Placeholder from './Placeholder'
import useTreeOpenHandler from './useTreeOpenHandler'
import styles from './styles.module.css'
import useEdit from '../useEdit'
import { reorderArray } from '../utils'

const EditIndexPagesTree = () => {
  const { ref, getPipeHeight, toggle } = useTreeOpenHandler()
  const { treeData, updateIndexPagesByTreeNodes } = useEdit()

  const handleDrop = (newTree: NodeModel[], e: DropOptions) => {
    const { dragSourceId, dropTargetId, destinationIndex } = e
    if (
      typeof dragSourceId === 'undefined' ||
      typeof dropTargetId === 'undefined'
    )
      return
    const start = treeData.find(v => v.id === dragSourceId)
    const end = treeData.find(v => v.id === dropTargetId)

    if (
      start?.parent === dropTargetId &&
      start &&
      typeof destinationIndex === 'number'
    ) {
      const output = reorderArray(
        treeData,
        treeData.indexOf(start),
        destinationIndex
      )
      updateIndexPagesByTreeNodes(output)
    }

    if (
      start?.parent !== dropTargetId &&
      start &&
      typeof destinationIndex === 'number'
    ) {
      if (
        getDescendants(treeData, dragSourceId).find(
          el => el.id === dropTargetId
        ) ||
        dropTargetId === dragSourceId ||
        (end && !end?.droppable)
      )
        return
      const output = reorderArray(
        treeData,
        treeData.indexOf(start),
        destinationIndex
      )
      const movedElement = output.find(el => el.id === dragSourceId)
      if (movedElement) movedElement.parent = dropTargetId
      updateIndexPagesByTreeNodes(output)
    }
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
          canDrop={() => true}
          dropTargetOffset={5}
          placeholderRender={(node, { depth }) => (
            <Placeholder node={node} depth={depth} />
          )}
          render={(node, { depth, isOpen, isDropTarget }) => (
            <Node
              getPipeHeight={getPipeHeight}
              node={node}
              depth={depth}
              isOpen={isOpen}
              onClick={() => {
                if (node.droppable) {
                  toggle(node?.id)
                }
              }}
              isDropTarget={isDropTarget}
              treeData={treeData}
            />
          )}
        />
      </div>
    </DndProvider>
  )
}

export default EditIndexPagesTree
