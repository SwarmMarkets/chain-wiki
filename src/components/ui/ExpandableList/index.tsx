import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { ExpandableListItem } from '@src/shared/types/expandedList'
import Icon from '../Icon'
import { StyledTitleBlock, StyledList, StyledListItem } from './styled-components'

interface ExpandableListProps {
  title: string
  items?: ExpandableListItem[]
  initialExpanded?: boolean
  onClickTitle?: () => void
  onClickItem?: (item: ExpandableListItem) => void
  highlightTitle?: boolean
}

const ExpandableList: React.FC<ExpandableListProps> = ({
  title,
  items,
  initialExpanded = false,
  onClickTitle,
  onClickItem,
  highlightTitle,
}) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  const onClickTitleBlock = () => {
    onClickTitle && onClickTitle()
  }

  const onExpandList = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      <StyledTitleBlock $expanded={isExpanded} $highlight={highlightTitle}>
        {items && (
          <Icon
            name='chevronRight'
            color={theme.palette.textPrimary}
            width={12}
            height={12}
            onClick={onExpandList}
          />
        )}
        <span onClick={onClickTitleBlock}>{title}</span>
      </StyledTitleBlock>
      {isExpanded && items && (
        <StyledList>
          {items.map(item => (
            <StyledListItem
              $highlight={item.highlight}
              onClick={() => onClickItem && onClickItem(item)}
              key={item.id}
            >
              {item.value}
            </StyledListItem>
          ))}
        </StyledList>
      )}
    </div>
  )
}

export default ExpandableList
