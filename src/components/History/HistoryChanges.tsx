import js_beautify from 'js-beautify';
import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import styled from 'styled-components';

interface HistoryChangesProps {
  beforeHtml: string;
  afterHtml: string;
}
const ReactDiffWrapper = styled.div`
  overflow: auto;

  pre {
    max-width: 400px;
    word-wrap: break-word !important;
  }
`;

const HistoryChanges: React.FC<HistoryChangesProps> = ({
  beforeHtml,
  afterHtml,
}) => {
  const htmlOptions = {
    wrap_line_length: 30,
    indent_size: 2,
    eol: '\n',
  };

  const beautifiedBeforeHtml = js_beautify.html(beforeHtml, htmlOptions);
  const beautifiedAfterHtml = js_beautify.html(afterHtml, htmlOptions);

  return (
    <ReactDiffWrapper>
      <ReactDiffViewer
        oldValue={beautifiedBeforeHtml}
        newValue={beautifiedAfterHtml}
        compareMethod={DiffMethod.LINES}
      />
    </ReactDiffWrapper>
  );
};

export default HistoryChanges;
