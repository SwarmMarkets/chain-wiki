import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Box from '../ui/Box'

export const StyledLink = styled(Link)<{
  isActive: boolean
  isSelected: boolean
  isHovered: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.linkPrimary : theme.palette.black};
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  overflow: hidden;
  padding: 5px;

  &:hover {
    background-color: ${({ theme, isActive }) => isActive ? theme.palette.blueLight : theme.palette.lightGray};
    color: ${({ theme, isActive }) =>
      isActive ? theme.palette.linkPrimary : theme.palette.black};
  }

  &:active {
    color: ${({ theme }) => theme.palette.linkPrimary};
  }
`

export const EditableItem = styled(Box)`
  word-break: break-word;
  transition: background-color 0.2s ease;
  user-select: none;

  &:active {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    background: ${({ theme }) => theme.palette.nearWhite};
  }
`
