import { Link, useLocation } from 'react-router-dom';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import { HistoryItem } from '@src/shared/types/history';
import queryString from 'query-string';

interface HistoryListProps {
  historyItems: HistoryItem[];
}

const HistoryList: React.FC<HistoryListProps> = ({ historyItems }) => {
  const location = useLocation();

  return (
    <Flex flexDirection="column" $gap="10px">
      {historyItems &&
        historyItems.map((item, index) => (
          <Card key={item.id}>
            <span>
              (
              {index === 0 ? (
                <span>curr</span>
              ) : (
                <Link
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldTokenId: item.id,
                    newTokenId: historyItems[0].id,
                  })}`}
                >
                  curr
                </Link>
              )}{' '}
              |{' '}
              {index === historyItems.length - 1 ? (
                <span>prev</span>
              ) : (
                <Link
                  to={`?${queryString.stringify({
                    ...queryString.parse(location.search),
                    oldTokenId: historyItems[index + 1].id,
                    newTokenId: item.id,
                  })}`}
                >
                  prev
                </Link>
              )}
              ){' '}
            </span>
            <span>{new Date(item.updatedAt).toLocaleString()} </span>
            <span>{item.editor}</span>
          </Card>
        ))}
    </Flex>
  );
};

export default HistoryList;
