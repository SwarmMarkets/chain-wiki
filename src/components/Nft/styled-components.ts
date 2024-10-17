import styled from 'styled-components'
import Card from '../ui/Card'
import Text from '../ui/Text'
import { Link } from 'react-router-dom'
import Content from '../Content'
import IndexPages from '../IndexPages'
import Flex from '../ui/Flex'

export const StyledCard = styled(Card)`
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.palette.borderBlue};
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
  line-height: 1.3;
  color: ${({ theme }) => theme.palette.gray};
`

const boxStyles = `
  margin-top: 78px;
  max-width: 210px;
  width: 100%;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  position: sticky;
  top: 24px;
  contain: paint;
  box-sizing: border-box;
  max-height: calc(100vh - (24px * 2));
`

export const StyledContent = styled(Content)`
  ${boxStyles}
`

export const StyledIndexPages = styled(IndexPages)`
  ${boxStyles}
`

export const ContentPlaceholder = styled.div`
  min-width: 210px;
  margin-top: 20px;
  word-wrap: break-word;
`

export const LogoWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.palette.bgPrimary};
  border-radius: 4px;
`

export const LogoPreview = styled.img`
  max-width: 200px;
  max-height: 100px;
`
