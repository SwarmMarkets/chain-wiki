import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import shouldForwardProp from '@styled-system/should-forward-prop'
import icons from '@src/shared/consts/icons'
import { PositionProps, SpaceProps, position, space } from 'styled-system'

export type IconName = keyof typeof icons

export type Cursor =
  | 'help'
  | 'wait'
  | 'crosshair'
  | 'not-allowed'
  | 'zoom-in'
  | 'grab'
  | 'pointer'
  | 'default'

interface IconProps
  extends HTMLAttributes<HTMLDivElement>,
    SpaceProps,
    PositionProps {
  name: IconName
  size?: number
  width?: number
  height?: number
  color?: string
  cursor?: Cursor
}

interface IconWrapperProps {
  cursor?: Cursor
}

const IconWrapper = styled.div.withConfig({
  shouldForwardProp,
})<IconWrapperProps>`
  cursor: ${props => props.cursor || 'default'};
  svg {
    path {
      fill: ${props => props.color};
    }
  }
  ${space}
  ${position}
`

const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  width,
  height,
  color,
  cursor,
  ...props
}) => {
  const IconComponent = icons[name]

  return (
    <React.Suspense fallback={<div />}>
      <IconWrapper color={color} cursor={cursor} {...props}>
        <IconComponent width={width || size} height={height || size} />
      </IconWrapper>
    </React.Suspense>
  )
}

export default Icon
