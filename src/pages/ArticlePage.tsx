import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Tabs from '@src/components/ui/Tabs';
import TinyEditor from '@src/components/Editor';
import HtmlRender from '@src/components/HtmlRender';
import Text from '@src/components/ui/Text';
import htmlArticleMock from '@src/shared/consts/htmlArticleMock';

const StyledTabs = styled(Tabs)`
  background: red;
`;

const ArticlePage = () => {
  const { articleId } = useParams();

  const [content, setContent] = useState(htmlArticleMock);

  const onChangeEditor = (content: string) => {
    setContent(content);
  };

  const tabs = [
    {
      title: 'Read',
      content: <HtmlRender html={content} />,
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
      <Text.h1 size="24px" weight={700}>
        Steve Jobs Article ID: {articleId}
      </Text.h1>
      <StyledTabs tabs={tabs}></StyledTabs>
    </>
  );
};

export default ArticlePage;
