import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import shouldForwardProp from '@styled-system/should-forward-prop'
import icons from '@src/shared/consts/icons'
import { PositionProps, SpaceProps, position, space } from 'styled-system'

interface IconProps
  extends HTMLAttributes<HTMLDivElement>,
    SpaceProps,
    PositionProps {
  name: keyof typeof icons
  size?: number
  width?: number
  height?: number
  color?: string
}

interface IconWrapperProps {
  $width: number
  $height: number
}

const IconWrapper = styled.div.withConfig({
  shouldForwardProp,
})<IconWrapperProps>`
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
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
  ...props
}) => {
  const IconComponent = icons[name]

  return (
    <React.Suspense fallback={<div />}>
      <IconWrapper
        $width={width || size}
        $height={height || size}
        color={color}
        {...props}
      >
        <IconComponent width={width || size} height={height || size} />
      </IconWrapper>
    </React.Suspense>
  )
}

export default Icon
