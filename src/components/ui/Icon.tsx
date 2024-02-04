import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import shouldForwardProp from '@styled-system/should-forward-prop';
import icons from '@src/shared/consts/icons';
import { SpaceProps, space } from 'styled-system';

interface IconProps extends HTMLAttributes<HTMLDivElement>, SpaceProps {
  name: keyof typeof icons;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
}

interface IconWrapperProps {
  $width: number;
  $height: number;
}

const IconWrapper = styled.div.withConfig({
  shouldForwardProp,
})<IconWrapperProps>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  svg {
    path {
      fill: ${(props) => props.color};
    }
  }
  ${space}
`;

const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  width = 20,
  height = 20,
  color,
  ...props
}) => {
  const IconComponent = icons[name];

  return (
    <React.Suspense fallback={<div />}>
      <IconWrapper $width={size || width} $height={size || height} color={color} {...props}>
        <IconComponent width={size || width} height={size || height} />
      </IconWrapper>
    </React.Suspense>
  );
};

export default Icon;
