import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { articleId } = useParams();

  return (
    <>
      <h1>Article Page ID: {articleId}</h1>
    </>
  );
};

export default ArticlePage;
