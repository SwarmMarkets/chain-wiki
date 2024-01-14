import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Content from '@src/components/Content';
import TinyEditor from '@src/components/Editor';
import HtmlRender from '@src/components/HtmlRender';
import Tabs from '@src/components/ui/Tabs';
import Text from '@src/components/ui/Text';
import htmlArticleMock from '@src/shared/consts/htmlArticleMock';

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

  const [content, setContent] = useState(htmlArticleMock);
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const onChangeEditor = (content: string) => {
    setContent(content);
  };

  const onMountContent = () => {
    setContentElem(contentRef?.current);
  };

  const tabs = [
    {
      title: 'Read',
      content: (
        <HtmlRender onMount={onMountContent} ref={contentRef} html={content} />
      ),
    },
    {
      title: 'Edit source',
      content: <TinyEditor content={content} onChange={onChangeEditor} />,
    },
    {
      title: 'View history',
      content: <p>History</p>,
    },
  ];

  return (
    <>
      <ArticleWrapper>
        {contentElem ? (
          <StyledContent contentElem={contentElem} />
        ) : (
          <ContentPlaceholder />
        )}
        <ArticleContent>
          <Text.h1 size="24px" weight={700}>
            Steve Jobs Article ID: {articleId}
          </Text.h1>
          <Tabs tabs={tabs} />
        </ArticleContent>
      </ArticleWrapper>
    </>
  );
};

export default ArticlePage;
