import Flex from '@src/components/ui/Flex'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }
`

export const EditableItem = styled(Flex)`
  word-break: break-word;
`
