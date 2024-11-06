import styled from 'styled-components'

export const StyledNav = styled.nav`
  padding-right: 25px;
  font-size: 12px;
`

export const StyledNavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
`

export const StyledTab = styled.div<{ $active: boolean }>`
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  color: ${props =>
    props.$active
      ? props.theme.palette.linkPrimaryAccent
      : props.theme.palette.textPrimary};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.linkPrimary};
  }
`

export const StyledTitle = styled.h4`
  white-space: nowrap;
  margin-bottom: 10px;
`
