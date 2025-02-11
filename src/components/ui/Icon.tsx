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

  const processSvgString = (svgString: string) => {
    let modifiedSvg = svgString

    if (color) {
      modifiedSvg = modifiedSvg
        .replace(/fill=".*?"/g, `fill="currentColor"`)
        .replace(/stroke=".*?"/g, `stroke="currentColor"`)
    }

    if (!/fill=/.test(modifiedSvg)) {
      modifiedSvg = modifiedSvg.replace('<svg', '<svg fill="currentColor"')
    }

    return modifiedSvg
  }

  return (
    <StyledSVG
      src={iconPath}
      style={{ color }}
      cursor={cursor}
      width={width || size}
      height={height || size}
      preProcessor={processSvgString}
      {...props}
    />
  )
}

export default Icon
