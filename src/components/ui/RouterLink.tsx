import { ChildrenProp } from '@src/shared/types/common-props'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  flexbox,
  layout,
  position,
  space,
} from 'styled-system'

interface RouterLinkProps
  extends ChildrenProp,
    FlexboxProps,
    LayoutProps,
    SpaceProps,
    PositionProps {}

const RouterLink = styled(Link).withConfig({
  shouldForwardProp,
})<RouterLinkProps>`
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }

  ${flexbox}
  ${layout}
  ${space}
  ${position}
`

export default RouterLink
