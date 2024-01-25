import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Content from '@src/components/Content';
import TinyEditor from '@src/components/Editor';
import HtmlRender from '@src/components/HtmlRender';
import Tabs from '@src/components/ui/Tabs';
import Text from '@src/components/ui/Text';
import History from '@src/components/History';
import htmlArticleMock from '@src/shared/consts/htmlArticleMock';
import editedHtmlArticleMock from '@src/shared/consts/editedHtmlArticleMock';

const ArticleWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ArticleContent = styled.div`
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
  const { articleId } = useParams();
  const { t } = useTranslation('article');
  const [content, setContent] = useState(htmlArticleMock);
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState(1);

  const contentRef = useRef<HTMLDivElement>(null);

  const onChangeEditor = (content: string) => {
    setContent(content);
  };

  const onMountContent = () => {
    setContentElem(contentRef?.current);
  };

  const onChangeTab = (id: number) => {
    setActiveTab(id);
  };

  const tabs = [
    {
      id: 1,
      title: t('tabs.read'),
      content: (
        <HtmlRender onMount={onMountContent} ref={contentRef} html={content} />
      ),
    },
    {
      id: 2,
      title: t('tabs.edit'),
      content: <TinyEditor content={content} onChange={onChangeEditor} />,
    },
    {
      id: 3,
      title: t('tabs.history'),
      content: <History history={[htmlArticleMock, editedHtmlArticleMock]} />,
    },
  ];

  return (
    <ArticleWrapper>
      {activeTab === 1 && contentElem ? (
        <StyledContent contentElem={contentElem} />
      ) : (
        <ContentPlaceholder />
      )}
      <ArticleContent>
        <Text.h1 size="24px" weight={700}>
          Steve Jobs Article ID: {articleId}
        </Text.h1>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={onChangeTab} />
      </ArticleContent>
    </ArticleWrapper>
  );
};

export default ArticlePage;
