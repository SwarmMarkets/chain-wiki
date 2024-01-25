import React from 'react';
import HistoryChanges from './HistoryChanges';

interface HistoryProps {
  history: string[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div>
      <HistoryChanges beforeHtml={history[0]} afterHtml={history[1]} />
    </div>
  );
};

export default History;
