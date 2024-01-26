import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import Text from './Text';
import { ChildrenProp } from '@src/shared/types/common-props';
import shouldForwardProp from '@styled-system/should-forward-prop';
import {
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  flexbox,
  layout,
  space,
} from 'styled-system';

interface CardProps
  extends ChildrenProp,
    FlexboxProps,
    LayoutProps,
    SpaceProps {
  title?: string;
  to?: string;
}

const CardRoot = styled.div.withConfig({
  shouldForwardProp,
})`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.bgPrimary};
  ${flexbox}
  ${layout}
  ${space}
`;

const ChildrenWrapper = styled.div.withConfig({
  shouldForwardProp,
})<SpaceProps>`
  ${space}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.linkPrimary};

  &:hover {
    text-decoration: underline !important;
  }
`;

const Card: React.FC<CardProps> = ({ title, to, children, ...props }) => {
  const theme = useTheme();

  return (
    <CardRoot {...props}>
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
      {children && <ChildrenWrapper mt={title ? 10 : 0} >{children}</ChildrenWrapper>}
    </CardRoot>
  );
};

export default Card;
