import React, { useState } from 'react';
import styled from 'styled-components';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import { ExpandableListItem } from '@src/shared/types/expandedList';

interface ExpandableListProps {
  title: string;
  items?: ExpandableListItem[];
  initialExpanded?: boolean;
  onClickTitle?: () => void;
  onClickItem?: (item: ExpandableListItem) => void;
}

interface StyledTitleBlockProps {
  $expanded: boolean;
}

const StyledTitleBlock = styled.div<StyledTitleBlockProps>`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 6px 0;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.linkPrimary};

  &:hover {
    text-decoration: underline;
  }

  svg {
    width: 12px;
    height: 12px;
    transform: rotate(${({ $expanded }) => ($expanded ? 90 : 0)}deg);
    transition: transform 0.2s ease-in-out;
    fill: ${({ theme }) => theme.palette.textPrimary};
  }
`;

const StyledList = styled.ul`
  margin-left: 30px;
`;

const StyledListItem = styled.li`
  color: ${({ theme }) => theme.palette.linkPrimary};
  padding: 6px 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ExpandableList: React.FC<ExpandableListProps> = ({
  title,
  items,
  initialExpanded = false,
  onClickTitle,
  onClickItem,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const onClickTitleBlock = () => {
    onClickTitle && onClickTitle();
  };

  const onExpandList = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <StyledTitleBlock $expanded={isExpanded}>
        {items && <ChevronRightIcon onClick={onExpandList} />}
        <span onClick={onClickTitleBlock}>{title}</span>
      </StyledTitleBlock>
      {isExpanded && items && (
        <StyledList>
          {items.map((item) => (
            <StyledListItem
              onClick={() => onClickItem && onClickItem(item)}
              key={item.id}
            >
              {item.value}
            </StyledListItem>
          ))}
        </StyledList>
      )}
    </div>
  );
};

export default ExpandableList;
