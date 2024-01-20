import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import Text from './Text';

interface CardProps {
  title: string;
  description: string;
  to?: string;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.linkPrimary};
  
  &:hover {
    text-decoration: underline !important;
  }
`;

const Card: React.FC<CardProps> = ({ title, description, to }) => {
  const theme = useTheme();

  return (
    <CardRoot>
      {to ? (
        <StyledLink to={to}>
          <Text.h2
            
            color={theme.palette.linkPrimary}
            size={theme.fontSizes.mediumPlus}
            weight={theme.fontWeights.bold}
          >
            {title}
          </Text.h2>
        </StyledLink>
      ) : (
        <Text.h2
          size={theme.fontSizes.mediumPlus}
          weight={theme.fontWeights.bold}
        >
          {title}
        </Text.h2>
      )}
      <Description>{description}</Description>
    </CardRoot>
  );
};

export default Card;
