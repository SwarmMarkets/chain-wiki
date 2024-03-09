import styled from 'styled-components'
import Card from '../ui/Card'
import Text from '../ui/Text'
import { Link } from 'react-router-dom'
import Content from '../Content'

export const StyledCard = styled(Card)`
  cursor: pointer;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.2);
  }
`

export const Title = styled(Text.h2)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const StyledLink = styled(Link)`
  display: contents;
`

export const StyledRolesDescription = styled(Text.p)`
  max-width: 700px;
  font-size: 1.05rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.palette.gray};
`

export const StyledContent = styled(Content)`
  min-width: 210px;
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
  min-width: 210px;
  margin-top: 20px;
  word-wrap: break-word;
`
