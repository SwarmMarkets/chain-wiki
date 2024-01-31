import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import Content from '@src/components/Content';
import TinyEditor from '@src/components/Editor';
import HtmlRender from '@src/components/HtmlRender';
import Tabs from '@src/components/ui/Tabs';
import Text from '@src/components/ui/Text';
import htmlArticleMock from '@src/shared/consts/htmlArticleMock';
import ArticleList from '@src/components/ArticleList';
import { useTranslation } from 'react-i18next';
import { Tab } from '@src/shared/types/tabs';

const ProjectWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ProjectContent = styled.div`
  max-width: 1052px;
  width: 100%;
`;

const StyledContent = styled(Content)`
  width: 210px;
  margin-top: 20px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  position: sticky;
  top: 24px;
  contain: paint;
  box-sizing: border-box;
  max-height: calc(100vh - (24px * 2));
`;

const ContentPlaceholder = styled.div`
  width: 210px;
  margin-top: 20px;
  word-wrap: break-word;
`;

const ArticlePage = () => {
  const { projectId } = useParams();

  const theme = useTheme();
  const { t } = useTranslation('project');
  const [content, setContent] = useState(htmlArticleMock);
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null);
  const [activeProjectTab, setActiveProjectTab] = useState(1);

  const contentRef = useRef<HTMLDivElement>(null);

  const onChangeEditor = (content: string) => {
    setContent(content);
  };

  const onMountContent = () => {
    setContentElem(contentRef?.current);
  };

  const onChangeProjectTab = (tab: Tab) => {
    setActiveProjectTab(tab.id);
  };

  const articleListData = [...new Array(8)].map((_, index) => ({
    id: index + 1,
    title: 'Steve Jobs Article',
    description: (contentElem && contentElem.textContent) || '',
  }));

  const projectTabs = [
    {
      id: 1,
      title: t('tabs.project'),
      content: (
        <HtmlRender onMount={onMountContent} ref={contentRef} html={content} />
      ),
    },
    {
      id: 2,
      title: t('tabs.articles'),
      content: <ArticleList articles={articleListData} />,
    },
    {
      id: 3,
      title: t('tabs.edit'),
      content: <TinyEditor content={content} onChange={onChangeEditor} />,
    },
  ];

  return (
    <ProjectWrapper>
      {activeProjectTab === 1 && contentElem ? (
        <StyledContent contentElem={contentElem} />
      ) : (
        <ContentPlaceholder />
      )}
      <ProjectContent>
        <Text.h1 size={theme.fontSizes.large} weight={700}>
          Steve Jobs Article ID: {projectId}
        </Text.h1>
        <Tabs
          tabs={projectTabs}
          activeTab={activeProjectTab}
          onChange={onChangeProjectTab}
        />
      </ProjectContent>
    </ProjectWrapper>
  );
};

export default ArticlePage;
