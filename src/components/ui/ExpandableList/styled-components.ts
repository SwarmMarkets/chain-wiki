import styled from 'styled-components'

interface StyledTitleBlockProps {
  $expanded: boolean
  $highlight?: boolean
  isActive?: boolean
}

export const StyledTitleBlock = styled.div<StyledTitleBlockProps>`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.linkPrimary : theme.palette.black};
  text-decoration: ${({ $highlight }) => ($highlight ? 'underline' : 'none')};

  &:hover {
    text-decoration: underline;
    background-color: ${({ theme }) => theme.palette.lightGray};
  }
    
  }

  svg {
    transform: rotate(${({ $expanded }) => ($expanded ? 90 : 0)}deg);
    transition: transform 0.2s ease-in-out;
  }
`

export const StyledList = styled.ul`
  margin-left: 30px;
`

interface StyledListItemProps {
  $highlight?: boolean
  isActive: boolean
}

export const StyledListContainer = styled.div`
  position: relative;
  padding-left: 15px;

  &::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: ${({ theme }) => theme.palette.lightGray};
  }
`

export const StyledListItem = styled.li<StyledListItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px;
  padding-left: 16px;
  cursor: pointer;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.linkPrimary : theme.palette.black};
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  text-decoration: ${({ $highlight }) => ($highlight ? 'underline' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: -40px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.palette.linkPrimary : 'transparent'};
    transition: background-color 0.3s;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.lightGray};
  }
`
