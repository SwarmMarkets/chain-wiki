import Content from '@src/components/Content'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`

export const InnerContainer = styled.div`
  max-width: 980px;
  width: 100%;
`

export const StyledContent = styled(Content)`
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
`

export const ContentPlaceholder = styled.div`
  width: 210px;
  margin-top: 20px;
  word-wrap: break-word;
`

export const ExplorerLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`
