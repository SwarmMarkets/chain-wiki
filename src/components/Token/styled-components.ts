import styled from 'styled-components';
import Content from '@src/components/Content';
import IndexPages from '../IndexPages';

const boxStyles = `
  width: 210px;
  margin-top: 59px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  position: sticky;
  top: 24px;
  contain: paint;
  box-sizing: border-box;
  max-height: calc(100vh - (24px * 2));
`;

export const TokenStyledContent = styled(Content)`
  ${boxStyles}
`;

export const TokenStyledIndexPages = styled(IndexPages)`
  ${boxStyles}
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;

export const InnerContainer = styled.div`
  max-width: 980px;
  width: 100%;
`;

export const ContentPlaceholder = styled.div`
  width: 210px;
  margin-top: 20px;
  word-wrap: break-word;
`;

