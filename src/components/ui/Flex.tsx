import { ChildrenProp } from '@src/shared/types/common-props'
import shouldForwardProp from '@styled-system/should-forward-prop'
import styled from 'styled-components'
import { flexbox, FlexboxProps, layout, LayoutProps, space, SpaceProps } from 'styled-system'

interface FlexProps extends ChildrenProp, FlexboxProps, LayoutProps, SpaceProps {
  $gap?: string
}

const Flex = styled.div.withConfig({ shouldForwardProp })<FlexProps>`
  display: flex;
  gap: ${props => props.$gap};
  ${flexbox}
  ${layout}
  ${space}
`

export default Flex
