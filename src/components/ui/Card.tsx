import styled from 'styled-components'
import { ChildrenProp } from '@src/shared/types/common-props'
import shouldForwardProp from '@styled-system/should-forward-prop'
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

interface CardProps
  extends ChildrenProp,
    FlexboxProps,
    LayoutProps,
    SpaceProps,
    PositionProps {
  onClick?(): void
}

const CardRoot = styled.div.withConfig({
  shouldForwardProp,
})`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.white};
  ${flexbox}
  ${layout}
  ${space}
  ${position}
`

const Card: React.FC<CardProps> = ({ onClick, children, ...props }) => {
  return (
    <CardRoot onClick={onClick} {...props}>
      {children}
    </CardRoot>
  )
}

export default Card
