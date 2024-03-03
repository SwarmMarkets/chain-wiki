import shouldForwardProp from '@styled-system/should-forward-prop'
import React from 'react'
import styled from 'styled-components'
import { LayoutProps, SpaceProps, layout, space } from 'styled-system'

interface DividerProps extends SpaceProps, LayoutProps {
  color?: string
}

const StyledDivider = styled.div.withConfig({
  shouldForwardProp,
})<DividerProps>`
  border-bottom: 1px solid
    ${props => props.color || props.theme.palette.textPrimary};
  ${space}
  ${layout}
`

const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return <StyledDivider {...props} />
}

export default Divider
