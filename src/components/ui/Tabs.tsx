import React from 'react';
import styled from 'styled-components';
import { Tab as ITab } from '../../shared/types/tabs';

interface TabProps {
  $active: boolean;
}

interface TabsProps {
  tabs: ITab[];
  activeTab: number;
  onChange: (tab: ITab) => void;
}

const TabsWrapper = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderPrimary};
`;

const Tab = styled.div<TabProps>`
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.$active ? `2px solid ${props.theme.palette.borderBlue}` : 'none'};
  color: ${(props) =>
    props.$active
      ? props.theme.palette.borderBlue
      : props.theme.palette.textPrimary};
`;

const TabContent = styled.div`
  padding: 15px 0;
`;

const Tabs: React.FC<TabsProps> = ({ tabs, onChange, activeTab }) => {
  const handleTabClick = (tab: ITab) => {
    onChange && onChange(tab);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div>
      <TabsWrapper>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            $active={tab.id === activeTab}
            onClick={() => handleTabClick(tab)}
          >
            {tab.title}
          </Tab>
        ))}
      </TabsWrapper>
      <TabContent>{activeTabContent}</TabContent>
    </div>
  );
};

export default Tabs;
