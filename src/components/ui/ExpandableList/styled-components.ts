import styled from 'styled-components';

interface StyledTitleBlockProps {
  $expanded: boolean;
  $isActive?: boolean;
}

export const StyledTitleBlock = styled.div<StyledTitleBlockProps>`
  display: flex;
  position: relative;
  align-items: center;
  gap: 4px;
  padding: 5px 16px;
  cursor: pointer;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.palette.linkPrimaryAccent : theme.palette.black};
  transition: background-color 0.3s, color 0.3s;

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.palette.linkPrimaryAccent : 'transparent'};
    transition: background-color 0.3s;
  }

  &:hover {
    color: ${({ theme }) => theme.palette.linkPrimary};
  }

  svg {
    transform: rotate(${({ $expanded }) => ($expanded ? 90 : 0)}deg);
    transition: transform 0.2s ease-in-out;
  }
`;

export const StyledList = styled.ul`
  margin-left: 30px;
`;

interface StyledListItemProps {
  $isActive: boolean;
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
`;

export const StyledListItem = styled.li<StyledListItemProps>`
  display: flex;
  position: relative;
  align-items: center;
  padding: 5px 16px;
  cursor: pointer;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.palette.linkPrimaryAccent : theme.palette.black};
  transition: background-color 0.3s, color 0.3s;

  &::before {
    content: '';
    position: absolute;
    left: -40px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.palette.linkPrimaryAccent : 'transparent'};
    transition: background-color 0.3s;
  }

  &:hover {
    color: ${({ theme }) => theme.palette.linkPrimary};
  }
`;

