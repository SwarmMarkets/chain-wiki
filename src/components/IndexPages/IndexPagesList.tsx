import { TokensQueryFullData } from '@src/shared/types/ipfs'
import React, { useState } from 'react'
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd'
import Checkbox from '../Checkbox'
import SMDroppable from '../common/SMDroppable'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import { EditableItem } from './styled-components'

interface IndexPagesListProps {
  tokens: TokensQueryFullData[]
  selectedIndexes: string[]
  onChangeCheckbox: (tokenId: string) => void
}

const IndexPagesList: React.FC<IndexPagesListProps> = ({
  tokens,
  selectedIndexes,
  onChangeCheckbox,
}) => {
  const [items, setItems] = useState<TokensQueryFullData[]>(tokens)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <SMDroppable droppableId='droppable'>
        {provided => (
          <Flex
            {...provided.droppableProps}
            ref={provided.innerRef}
            flexDirection='column'
            $gap='8px'
            py='8px'
          >
            {items?.map(
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
                        <Checkbox
                          checked={selectedIndexes.includes(token?.id)}
                          onChange={() => onChangeCheckbox(token?.id)}
                        />
                        <Text ml='5px'>{token?.id}</Text>
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

export default IndexPagesList
