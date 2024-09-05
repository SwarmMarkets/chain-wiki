import Divider from '@src/components/ui/Divider'
import { IpfsIndexPage, TokensQueryFullData } from '@src/shared/types/ipfs'
import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import IndexPagesEditList from './IndexPagesEditList'
import useDroppableEditList from './useDroppableEditList'

interface IndexPagesEditListChanges {
  activeIndexPages: IpfsIndexPage[]
  disabledIndexPages: IpfsIndexPage[]
}
interface IndexPagesEditProps {
  tokens: TokensQueryFullData[]
  indexPages: IpfsIndexPage[]
  onChange: (changes: IndexPagesEditListChanges) => void
}

const IndexPagesEdit: React.FC<IndexPagesEditProps> = ({
  tokens,
  indexPages,
  onChange,
}) => {
  const { activeIndexPages, disabledIndexPages, dragAndDrop } =
    useDroppableEditList({ indexPages, tokens })

  const handleDragEnd = (result: DropResult) => {
    const dragAndDropChanges = dragAndDrop(result)

    if (dragAndDropChanges) {
      onChange(dragAndDropChanges)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <IndexPagesEditList
        indexPages={activeIndexPages}
        droppableId='activeIndexPages'
      />
      <Divider my='10px' />
      <IndexPagesEditList
        indexPages={disabledIndexPages}
        droppableId='disabledIndexPages'
      />
    </DragDropContext>
  )
}

export default IndexPagesEdit
