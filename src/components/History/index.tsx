import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import HistoryDifference from './HistoryDifference';
import articleHistoryMock from '@src/shared/consts/articleHistoryMock';
import HistoryList from './HistoryList';

const History = () => {
  const location = useLocation();
  const mode = useMemo(() => {
    const params = queryString.parse(location.search);

    if (params.oldTokenId && params.newTokenId) {
      return 'difference';
    } else {
      return 'list';
    }
  }, [location.search]);

  return (
    <div>
      {mode === 'list' ? (
        <HistoryList historyItems={articleHistoryMock} />
      ) : (
        <HistoryDifference />
      )}
    </div>
  );
};

export default History;
