import React from 'react';
import Text from './Text';
import styled, { useTheme } from 'styled-components';

interface CardProps {
  title: string;
  description: string;
}

const CardRoot = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.bgPrimary};
`;

const Description = styled(Text.p)`
  margin-top: 10px;
  text-overflow: ellipsis;
`;

const Card: React.FC<CardProps> = ({ title, description }) => {
  const theme = useTheme();
  console.log(theme);

  return (
    <CardRoot>
      <Text.h2
        size={theme.fontSizes.mediumPlus}
        weight={theme.fontWeights.bold}
      >
        {title}
      </Text.h2>
      <Description>{description}</Description>
    </CardRoot>
  );
};

export default Card;
