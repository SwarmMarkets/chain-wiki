import {
  DndProvider,
  DropOptions,
  getBackendOptions,
  getDescendants,
  MultiBackend,
  Tree,
  NodeModel,
} from '@minoru/react-dnd-treeview'
import React, { useEffect } from 'react'
import Node from './Node'
import Placeholder from './Placeholder'
import useTreeOpenHandler from './useTreeOpenHandler'
import styles from './styles.module.css'
import { useEditingStore } from 'src/shared/store/editing-store'
import useEdit from '../useEdit'

const reorderArray = (
  array: NodeModel[],
  sourceIndex: number,
  targetIndex: number
) => {
  const newArray = [...array]
  const element = newArray.splice(sourceIndex, 1)[0]
  newArray.splice(targetIndex, 0, element)
  return newArray
}

export default function App() {
  const { ref, getPipeHeight, toggle } = useTreeOpenHandler()
  const { editedIndexPages } = useEditingStore()
  const { hiddenIndexPages } = useEdit()
  const [treeData, setTreeData] = React.useState<NodeModel[]>([])

  useEffect(() => {
    const editedIndexPagesNodes = editedIndexPages.items.map<NodeModel>(ip => ({
      id: ip.tokenId,
      droppable: false,
      text: ip.title,
      parent: 0,
    }))

    const hiddenIndexPagesList = {
      id: 'hiddenIndexPages',
      droppable: true,
      text: 'Hidden index pages',
      parent: 0,
    }
    const hiddenIndexPagesNodes = hiddenIndexPages.map<NodeModel>(ip => ({
      id: ip.id,
      droppable: false,
      text: ip.name,
      parent: 'hiddenIndexPages',
    }))
    setTreeData([
      ...editedIndexPagesNodes,
      hiddenIndexPagesList,
      ...hiddenIndexPagesNodes,
    ])
  }, [editedIndexPages.items, hiddenIndexPages])

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
      setTreeData(treeData => {
        const output = reorderArray(
          treeData,
          treeData.indexOf(start),
          destinationIndex
        )
        return output
      })
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
      setTreeData(treeData => {
        const output = reorderArray(
          treeData,
          treeData.indexOf(start),
          destinationIndex
        )
        const movedElement = output.find(el => el.id === dragSourceId)
        if (movedElement) movedElement.parent = dropTargetId
        return output
      })
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
