import SMDroppable from '@src/components/common/SMDroppable'
import Box from '@src/components/ui/Box'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import { IpfsIndexPage } from '@src/shared/utils/ipfs/types'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useTheme } from 'styled-components'
import { EditableItem } from '../styled-components'

interface IndexPagesEditListProps {
  indexPages: IpfsIndexPage[]
  droppableId: string
  noPagesElem?: JSX.Element
}

const IndexPagesEditList: React.FC<IndexPagesEditListProps> = ({
  indexPages,
  droppableId,
  noPagesElem,
}) => {
  const theme = useTheme()
  return (
    <Box
      background={theme.palette.bgPrimary}
      p='5px'
      borderRadius='5px'
      border={`1px solid ${theme.palette.borderPrimary}`}
    >
      <SMDroppable droppableId={droppableId}>
        {provided => (
          <Flex
            {...provided.droppableProps}
            ref={provided.innerRef}
            flexDirection='column'
            $gap='8px'
            py='8px'
          >
            {indexPages.length > 0
              ? indexPages?.map(
                  (indexPage, index) =>
                    indexPage?.tokenId && (
                      <Draggable
                        key={indexPage?.tokenId}
                        draggableId={indexPage?.tokenId}
                        index={index}
                      >
                        {provided => (
                          <EditableItem
                            key={indexPage?.tokenId}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Text ml='5px'>{indexPage.title}</Text>
                          </EditableItem>
                        )}
                      </Draggable>
                    )
                )
              : noPagesElem && <Text.p>{noPagesElem}</Text.p>}
          </Flex>
        )}
      </SMDroppable>
    </Box>
  )
}

export default IndexPagesEditList
