import Divider from '@src/components/ui/Divider'
import Text from '@src/components/ui/Text'
import { IpfsIndexPage, TokensQueryFullData } from '@src/shared/types/ipfs'
import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import IndexPagesEditList from './IndexPagesEditList'
import useDroppableEditList from './useDroppableEditList'

export interface IndexPagesEditListChanges {
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
  const theme = useTheme()
  const { t } = useTranslation('nft', { keyPrefix: 'indexPages' })
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
        noPagesElem={
          <Text.p
            fontSize={theme.fontSizes.small}
            color={theme.palette.borderPrimary}
            textAlign='center'
            fontWeight={theme.fontWeights.medium}
          >
            {t('noPagesInActiveList')}
          </Text.p>
        }
      />
      <Divider my='10px' />
      <Text.p fontWeight={theme.fontWeights.bold} mb='5px'>
        {t('hiddenListTitle')}
      </Text.p>
      <IndexPagesEditList
        indexPages={disabledIndexPages}
        droppableId='disabledIndexPages'
        noPagesElem={
          <Text.p
            fontSize={theme.fontSizes.small}
            color={theme.palette.borderPrimary}
            textAlign='center'
            fontWeight={theme.fontWeights.medium}
          >
            {t('noPagesInHiddenList')}
          </Text.p>
        }
      />
    </DragDropContext>
  )
}

export default IndexPagesEdit
