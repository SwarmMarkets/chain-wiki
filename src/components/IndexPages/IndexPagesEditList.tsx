import { TokensQueryFullData } from '@src/shared/types/ipfs'
import React, { useState } from 'react'
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd'
import SMDroppable from '../common/SMDroppable'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import { EditableItem } from './styled-components'
import Divider from '../ui/Divider'

interface IndexPagesEditListProps {
  tokens: TokensQueryFullData[]
}

const IndexPagesEditList: React.FC<IndexPagesEditListProps> = ({ tokens }) => {
  const [activeIndexPages, setActiveIndexPages] = useState<
    TokensQueryFullData[]
  >([])
  const [disabledIndexPages, setDisabledIndexPages] =
    useState<TokensQueryFullData[]>(tokens)

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    const isSameList = source.droppableId === destination.droppableId

    if (isSameList) {
      if (source.droppableId === 'activeIndexPages') {
        const reorderedPages = Array.from(activeIndexPages)
        const [moved] = reorderedPages.splice(source.index, 1)
        reorderedPages.splice(destination.index, 0, moved)
        setActiveIndexPages(reorderedPages)
      } else if (source.droppableId === 'disabledIndexPages') {
        const reorderedPages = Array.from(disabledIndexPages)
        const [moved] = reorderedPages.splice(source.index, 1)
        reorderedPages.splice(destination.index, 0, moved)
        setDisabledIndexPages(reorderedPages)
      }
    } else {
      if (source.droppableId === 'activeIndexPages') {
        const activeCopy = Array.from(activeIndexPages)
        const inactiveCopy = Array.from(disabledIndexPages)
        const [moved] = activeCopy.splice(source.index, 1)
        inactiveCopy.splice(destination.index, 0, moved)
        setActiveIndexPages(activeCopy)
        setDisabledIndexPages(inactiveCopy)
      } else if (source.droppableId === 'disabledIndexPages') {
        const inactiveCopy = Array.from(disabledIndexPages)
        const activeCopy = Array.from(activeIndexPages)
        const [moved] = inactiveCopy.splice(source.index, 1)
        activeCopy.splice(destination.index, 0, moved)
        setDisabledIndexPages(inactiveCopy)
        setActiveIndexPages(activeCopy)
      }
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <SMDroppable droppableId='activeIndexPages'>
        {provided => (
          <Flex
            {...provided.droppableProps}
            ref={provided.innerRef}
            flexDirection='column'
            $gap='8px'
            py='8px'
          >
            {activeIndexPages?.map(
              (token, index) =>
                token?.id && (
                  <Draggable
                    key={token?.id}
                    draggableId={token?.id}
                    index={index}
                  >
                    {provided => (
                      <EditableItem
                        key={token?.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Text ml='5px'>{token.name}</Text>
                      </EditableItem>
                    )}
                  </Draggable>
                )
            )}
          </Flex>
        )}
      </SMDroppable>
      <Divider my='10px' />
      <SMDroppable droppableId='disabledIndexPages'>
        {provided => (
          <Flex
            {...provided.droppableProps}
            ref={provided.innerRef}
            flexDirection='column'
            $gap='8px'
            py='8px'
          >
            {disabledIndexPages?.map(
              (token, index) =>
                token?.id && (
                  <Draggable
                    key={token?.id}
                    draggableId={token?.id}
                    index={index}
                  >
                    {provided => (
                      <EditableItem
                        key={token?.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Text ml='5px'>{token?.name}</Text>
                      </EditableItem>
                    )}
                  </Draggable>
                )
            )}
          </Flex>
        )}
      </SMDroppable>
    </DragDropContext>
  )
}

export default IndexPagesEditList
