import styled from "styled-components"
import Card from "../ui/Card"
import Text from "../ui/Text"
import { Link } from "react-router-dom"

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

export const ExplorerLink = styled.span`
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }
`

export const StyledLink = styled(Link)`
  display: contents;
`