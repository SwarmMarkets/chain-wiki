import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { ExpandableListItem } from '@src/shared/types/expandedList'
import Icon from '../Icon'
import {
  StyledTitleBlock,
  StyledList,
  StyledListItem,
  StyledListContainer,
} from './styled-components'

interface ExpandableListProps {
  id?: number
  title: string
  items?: ExpandableListItem[]
  initialExpanded?: boolean
  onClickTitle?: () => void
  onClickItem?: (item: ExpandableListItem) => void
  highlightTitle?: boolean
  activeItemId?: number
}

const ExpandableList: React.FC<ExpandableListProps> = ({
  id,
  title,
  items,
  initialExpanded = false,
  onClickTitle,
  onClickItem,
  highlightTitle,
  activeItemId,
}) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleClickItem = (item: ExpandableListItem) => {
    if (onClickItem) onClickItem(item)
  }

  const isTitleActive = activeItemId === id

  return (
    <StyledListContainer>
      <StyledTitleBlock
        $expanded={isExpanded}
        $highlight={highlightTitle}
        isActive={isTitleActive}
      >
        {items && (
          <Icon
            name='chevronRight'
            color={theme.palette.textPrimary}
            width={12}
            height={12}
            onClick={handleExpand}
          />
        )}
        <span onClick={onClickTitle}>{title}</span>
      </StyledTitleBlock>
      {isExpanded && items && (
        <StyledList>
          {items.map(item => (
            <StyledListItem
              key={item.id}
              isActive={activeItemId === item.id}
              $highlight={item.highlight}
              onClick={() => handleClickItem(item)}
            >
              {item.value}
            </StyledListItem>
          ))}
        </StyledList>
      )}
    </StyledListContainer>
  )
}

export default ExpandableList
