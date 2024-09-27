import styled from 'styled-components'

interface StyledTitleBlockProps {
  $expanded: boolean
  $highlight?: boolean
}

export const StyledTitleBlock = styled.div<StyledTitleBlockProps>`
  display: flex;
  gap: 4px;
  align-items: center;
  padding-bottom: 6px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.linkPrimary};

  text-decoration: ${props => (props.$highlight ? 'underline' : 'none')};

  &:hover {
    text-decoration: underline;
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
}

export const StyledListItem = styled.li<StyledListItemProps>`
  color: ${({ theme }) => theme.palette.linkPrimary};
  padding: 6px 0;
  cursor: pointer;

  text-decoration: ${props => (props.$highlight ? 'underline' : 'none')};

  &:hover {
    text-decoration: underline;
  }
`
