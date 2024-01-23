import { ChildrenProp } from '@src/shared/types/common-props'
import shouldForwardProp from '@styled-system/should-forward-prop'
import styled from 'styled-components'
import { flexbox, FlexboxProps, layout, LayoutProps, space, SpaceProps } from 'styled-system'

interface FlexProps extends ChildrenProp, FlexboxProps, LayoutProps, SpaceProps {
  $flexDirection?: string
  $gap?: string
}

const Flex = styled.div.withConfig({ shouldForwardProp })<FlexProps>`
  display: flex;
  ${flexbox}
  ${layout}
  ${space}
`

export default Flex
