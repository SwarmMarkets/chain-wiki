import { ChildrenProp } from '@src/shared/types/common-props'
import shouldForwardProp from '@styled-system/should-forward-prop'
import styled from 'styled-components'
import {
  LayoutProps,
  SpaceProps,
  TextAlignProps,
  TextStyleProps,
  layout,
  space,
  textAlign,
  textStyle
} from 'styled-system'

export interface ButtonProps
  extends ChildrenProp,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    SpaceProps,
    LayoutProps,
    TextAlignProps,
    TextStyleProps {}

const StyledButton = styled.button.withConfig({ shouldForwardProp })`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 4px;
  background-color: transparent;
  height: 44px;
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
`

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
