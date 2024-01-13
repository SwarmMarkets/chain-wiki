import React, { useState } from 'react';
import styled from 'styled-components';

interface TabProps {
  $active: boolean;
}

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
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

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <TabsWrapper>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            $active={index === activeTab}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </Tab>
        ))}
      </TabsWrapper>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </div>
  );
};

export default Tabs;
