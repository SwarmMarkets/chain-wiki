import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { PositionProps, SpaceProps, position, space } from 'styled-system'
import SVG from 'react-inlinesvg'
import { IconName } from 'src/shared/types/iconNames'

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

const StyledSVG = styled(SVG)<{
  color?: string
  cursor?: Cursor
  width?: number
  height?: number
}>`
  cursor: ${props => props.cursor || 'default'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};

  svg {
    path {
      fill: ${props => props.color || 'inherit'};
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
  const iconPath = `/assets/icons/${name}.svg`

  return (
    <StyledSVG
      src={iconPath}
      color={color}
      cursor={cursor}
      width={width || size}
      height={height || size}
      {...props}
    />
  )
}

export default Icon
