import styled from 'styled-components'

import { ChildrenProp } from '@src/shared/types/common-props'
import { SpaceProps, TextAlignProps, space, textAlign } from 'styled-system'

interface StyledTextProps extends ChildrenProp {
  $color?: string
  $size?: string
  $weight?: number
}

const StyledText = styled.span<StyledTextProps>`
  color: ${props => props.$color || props.theme.palette.textPrimary};
  font-size: ${props => props.$size};
  font-weight: ${props => props.$weight};
  font-family: ${({ theme }) => theme.fontFamilies.roboto};
  ${textAlign}
  ${space}
`

interface TextProps
  extends React.ParamHTMLAttributes<HTMLParagraphElement>,
    TextAlignProps,
    SpaceProps {
  as?: string
  color?: string
  size?: string
  weight?: number
}

const Text = ({ as: HTMLElement = 'span', color, size, weight, children, ...props }: TextProps) => {
  return (
    <StyledText as={HTMLElement} $color={color} $size={size} $weight={weight} {...props}>
      {children}
    </StyledText>
  )
}

Text.h1 = (props: TextProps) => <Text as="h1" {...props} />
Text.h2 = (props: TextProps) => <Text as="h2" {...props} />
Text.h3 = (props: TextProps) => <Text as="h3" {...props} />
Text.h4 = (props: TextProps) => <Text as="h4" {...props} />
Text.h5 = (props: TextProps) => <Text as="h5" {...props} />
Text.h6 = (props: TextProps) => <Text as="h6" {...props} />
Text.span = (props: TextProps) => <Text as="span" {...props} />
Text.p = (props: TextProps) => <Text as="p" {...props} />

export default Text
