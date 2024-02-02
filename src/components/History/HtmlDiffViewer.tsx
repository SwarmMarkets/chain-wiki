import js_beautify from 'js-beautify';
import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import styled from 'styled-components';

interface HtmlDiffViewerProps {
  oldHtml: string;
  newHtml: string;
}
const ReactDiffWrapper = styled.div`
  overflow: auto;

  pre {
    max-width: 400px;
    word-wrap: break-word !important;
  }
`;

const HtmlDiffViewer: React.FC<HtmlDiffViewerProps> = ({
  oldHtml,
  newHtml,
}) => {
  const htmlOptions = {
    wrap_line_length: 30,
    indent_size: 2,
    eol: '\n',
  };

  const beautifiedOldHtml = js_beautify.html(oldHtml, htmlOptions);
  const beautifiedNewHtml = js_beautify.html(newHtml, htmlOptions);

  return (
    <ReactDiffWrapper>
      <ReactDiffViewer
        oldValue={beautifiedOldHtml}
        newValue={beautifiedNewHtml}
        compareMethod={DiffMethod.CHARS}
      />
    </ReactDiffWrapper>
  );
};

export default HtmlDiffViewer;
