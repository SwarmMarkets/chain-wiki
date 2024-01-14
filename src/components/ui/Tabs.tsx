import React from 'react';
import styled from 'styled-components';

interface TabProps {
  $active: boolean;
}

interface Tab {
  id: number;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  onChange: (index: number) => void;
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
  const handleTabClick = (id: number) => {
    onChange && onChange(id);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div>
      <TabsWrapper>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            $active={tab.id === activeTab}
            onClick={() => handleTabClick(tab.id)}
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
