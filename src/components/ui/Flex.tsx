import { ChildrenProp } from '@src/shared/types/common-props'
import styled from 'styled-components'
import { flexbox, FlexboxProps, layout, LayoutProps, space, SpaceProps } from 'styled-system'

interface FlexProps extends ChildrenProp, FlexboxProps, LayoutProps, SpaceProps {
  $alignItems?: string
  $justifyContent?: string
  $flexWrap?: string
  $flexDirection?: string
  $display?: string
  $gap?: string
}

const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: ${props => props.$justifyContent || 'initial'};
  align-items: ${props => props.$alignItems || 'initial'};
  flex-wrap: ${props => props.$flexWrap || 'nowrap'};
  flex-direction: ${props => props.$flexDirection || 'row'};
  gap: ${props => props.$gap};
  ${flexbox}
  ${layout}
  ${space}
`

export default Flex
