import { ChildrenProp } from '@src/shared/types/common-props'
import shouldForwardProp from '@styled-system/should-forward-prop'
import styled, { useTheme } from 'styled-components'
import {
  LayoutProps,
  SpaceProps,
  TextAlignProps,
  TextStyleProps,
  FontSizeProps,
  layout,
  space,
  textAlign,
  textStyle,
  fontSize,
} from 'styled-system'

export type ButtonSize = 'small' | 'medium'

interface StyledButtonProps
  extends SpaceProps,
    LayoutProps,
    TextAlignProps,
    TextStyleProps,
    FontSizeProps {}

export interface ButtonProps
  extends ChildrenProp,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    StyledButtonProps {
  size?: ButtonSize
}

const StyledButton = styled.button.withConfig({
  shouldForwardProp,
})<StyledButtonProps>`
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamilies.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.palette.textPrimary};
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${({ theme, disabled }) =>
      disabled ? theme.palette.borderPrimary : theme.palette.borderBlue};
    color: ${({ theme, disabled }) =>
      disabled ? theme.palette.textPrimary : theme.palette.borderBlue};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }

  ${({ disabled }) => disabled && 'opacity: 0.4; filter: alpha(opacity=40);'}

  ${textStyle}
  ${textAlign}
  ${layout}
  ${space}
  ${fontSize}
`

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'medium',
  ...props
}) => {
  const theme = useTheme()

  const getButtonSizeOptions = (size: ButtonSize) => {
    const small = { fontSize: theme.fontSizes.small, py: '6px', px: '9px' }
    const medium = { fontSize: theme.fontSizes.medium, py: '12px', px: '16px' }

    switch (size) {
      case 'small':
        return small
      case 'medium':
        return medium
      default:
        return medium
    }
  }

  return (
    <StyledButton {...getButtonSizeOptions(size)} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
