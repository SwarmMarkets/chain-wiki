import RoutePaths from '@src/shared/enums/routes-paths';
import { generatePath } from 'react-router-dom';
import { useId } from 'react';import Card from './ui/Card';
import Flex from './ui/Flex';

interface Article {
  id: number;
  title: string;
  description: string;
}

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const id = useId();
  const getLimitedDescription = (description: string) =>
    description.length > 700
      ? description.substring(0, 700) + '...'
      : description;

  return (
    <Flex $flexDirection="column" $gap="10px">
      {articles.map((article) => (
        <Card
          to={generatePath(RoutePaths.PROJECT + RoutePaths.ARTICLE, {
            projectId: id,
            articleId: id,
          })}
          title={article.title}
          description={getLimitedDescription(article.description)}
          key={article.id}
        />
      ))}
    </Flex>
  );
};

export default ArticleList;
