import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Box from '../ui/Box'
import Card from '../ui/Card'
import Flex from '../ui/Flex'
import Text from '../ui/Text'

export const StyledCard = styled(Card)`
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.palette.borderBlue};
  }
`

export const Title = styled(Text.h3)`
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`

export const StyledLink = styled(Link)`
  display: contents;
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
  box-sizing: border-box;
  max-height: calc(100vh - (24px * 2));
`

export const SideContentWrap = styled(Box)`
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
