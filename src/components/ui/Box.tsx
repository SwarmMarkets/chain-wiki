import styled from 'styled-components'
import { LayoutProps, SpaceProps, layout, space } from 'styled-system'

interface Props extends LayoutProps, SpaceProps {}

const Box = styled.div<Props>`
  ${layout}
  ${space}
`

export default Box
