import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Box from '../ui/Box'

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }
`

export const EditableItem = styled(Box)`
  word-break: break-word;
  transition: background-color 0.2s ease;
  user-select: none;

  &:active {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    background: ${({ theme }) => theme.palette.nearWhite};
    padding: 5px;
  }
`
