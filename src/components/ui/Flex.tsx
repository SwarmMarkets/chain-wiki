import { ChildrenProp } from '@src/shared/types/common-props'
import styled from 'styled-components'

interface FlexProps extends ChildrenProp {
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
`

export default Flex
