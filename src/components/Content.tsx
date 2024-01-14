import React from 'react';
import styled from 'styled-components';
import ExpandableList from './ui/ExpandableList';
import { ExpandableListItem } from '@src/shared/types/expandedList';
import { ContentItemParent } from '@src/shared/types/content';
import { buildContentHierarchy } from '@src/shared/utils';

interface ContentProps {
  contentElem: HTMLDivElement;
  className?: string;
}

const ContentsTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 16px;
  padding: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderPrimary};
`;

const Content: React.FC<ContentProps> = ({ contentElem, className }) => {
  const headings = contentElem?.querySelectorAll('h1, h2');

  const contentData: ContentItemParent[] = buildContentHierarchy(headings);

  const onClickTitle = (elem: Element) => {
    elem.scrollIntoView({ behavior: 'smooth' });
  };

  const onClickItem = (elem?: Element) => {
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={className}>
      <ContentsTitle>Contents</ContentsTitle>
      {contentData.map((item) =>
        item.childs ? (
          <ExpandableList
            onClickTitle={() => onClickTitle(item.elem)}
            onClickItem={(listItem: ExpandableListItem) =>
              onClickItem(
                item.childs?.find((child) => child.id === listItem.id)?.elem
              )
            }
            key={item.id}
            title={item.title}
            items={item.childs?.map((child) => ({
              id: child.id,
              value: child.title,
            }))}
          />
        ) : (
          <div key={item.id}>{item.title}</div>
        )
      )}
    </div>
  );
};

export default Content;
