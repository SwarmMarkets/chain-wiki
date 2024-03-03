import { Link } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import Text from './Text'
import { ChildrenProp } from '@src/shared/types/common-props'
import shouldForwardProp from '@styled-system/should-forward-prop'
import {
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  flexbox,
  layout,
  position,
  space,
} from 'styled-system'

interface CardProps
  extends ChildrenProp,
    FlexboxProps,
    LayoutProps,
    SpaceProps,
    PositionProps {
  onClick?(): void
  title?: string
  to?: string
}

const CardRoot = styled.div.withConfig({
  shouldForwardProp,
})`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.1);
  ${flexbox}
  ${layout}
  ${space}
  ${position}
`

const ChildrenWrapper = styled.div.withConfig({
  shouldForwardProp,
})<SpaceProps>`
  height: 100%;
  ${space}
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.linkPrimary};

  &:hover {
    text-decoration: underline !important;
  }
`

const Title = styled(Text.h2)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Card: React.FC<CardProps> = ({
  onClick,
  title,
  to,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <CardRoot onClick={onClick} {...props}>
      {to ? (
        <StyledLink to={to}>
          <Title
            color={theme.palette.linkPrimary}
            size={theme.fontSizes.mediumPlus}
            weight={theme.fontWeights.bold}
          >
            {title}
          </Title>
        </StyledLink>
      ) : (
        <Title
          size={theme.fontSizes.mediumPlus}
          weight={theme.fontWeights.bold}
        >
          {title}
        </Title>
      )}
      {children && (
        <ChildrenWrapper mt={title ? 10 : 0}>{children}</ChildrenWrapper>
      )}
    </CardRoot>
  )
}

export default Card
