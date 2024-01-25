import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import shouldForwardProp from '@styled-system/should-forward-prop';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  name: keyof typeof icons;
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
`;

const icons = {
  chevronRight: React.lazy(
    () => import('@src/assets/icons/chevronRight.svg?react')
  ),
  search: React.lazy(() => import('@src/assets/icons/search.svg?react')),
};

const Icon: React.FC<IconProps> = ({
  name,
  width = 20,
  height = 20,
  color,
  ...props
}) => {
  const IconComponent = icons[name];

  return (
    <IconWrapper $width={width} $height={height} color={color} {...props}>
      <IconComponent width={width} height={height} />
    </IconWrapper>
  );
};

export default Icon;
