import styled from 'styled-components'
import {
  BackgroundProps,
  LayoutProps,
  SpaceProps,
  background,
  layout,
  space,
  border,
  BorderProps,
} from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'

export interface BoxProps
  extends LayoutProps,
    SpaceProps,
    BackgroundProps,
    BorderProps {}

const Box = styled.div.withConfig({ shouldForwardProp })<BoxProps>`
  ${layout}
  ${background}
  ${space}
  ${border}
`

export default Box
