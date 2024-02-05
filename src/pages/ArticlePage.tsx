import { useRef, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import queryString from 'query-string';
import Content from '@src/components/Content';
import Editor from '@src/components/Editor';
import HtmlRender from '@src/components/HtmlRender';
import Tabs from '@src/components/ui/Tabs';
import Text from '@src/components/ui/Text';
import History from '@src/components/History';
import htmlArticleMock from '@src/shared/consts/htmlArticleMock';
import { Tab } from '@src/shared/types/ui-components';

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('article');
  const [content, setContent] = useState(htmlArticleMock);
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null);
  const initialTab = Number(searchParams.get('tab')) || 1;
  const [activeTab, setActiveTab] = useState(initialTab);

  const contentRef = useRef<HTMLDivElement>(null);

  const onChangeEditor = (content: string) => {
    setContent(content);
  };

  const onSaveEditor = (content: string) => {
    console.log(content);
  }

  const onMountContent = () => {
    setContentElem(contentRef?.current);
  };

  const onChangeTab = (tab: Tab) => {
    setActiveTab(tab.id);
    if (tab.id === 1) {
      const params = queryString.exclude(location.search, ['tab']);
      navigate({ search: params });
      return;
    }
    const params = queryString.stringify({ tab: tab.id });
    navigate({ search: `?${params}` }, { replace: true });
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
      content: <Editor initialContent={htmlArticleMock} onChange={onChangeEditor} onSave={onSaveEditor} />,
    },
    {
      id: 3,
      title: t('tabs.history'),
      content: <History />,
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
