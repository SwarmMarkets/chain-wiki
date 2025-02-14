import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { ExpandableListItem } from 'src/shared/types/expandedList'
import Icon from '../../ui-kit/Icon/Icon'
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
  isActive?: boolean
}

const ExpandableList: React.FC<ExpandableListProps> = ({
  title,
  items = [],
  initialExpanded = false,
  onClickTitle,
  onClickItem,
  isActive,
}) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleClickItem = (item: ExpandableListItem) => {
    onClickItem?.(item)
  }

  return (
    <StyledListContainer>
      <StyledTitleBlock $expanded={isExpanded} $isActive={isActive}>
        {items.length > 0 && (
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
      {isExpanded && (
        <StyledList>
          {items.map(item => (
            <StyledListItem
              key={item.id}
              $isActive={item.isActive || false}
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
