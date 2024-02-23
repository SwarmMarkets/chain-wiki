import shouldForwardProp from '@styled-system/should-forward-prop'
import styled from 'styled-components'
import { layout, space, LayoutProps, SpaceProps } from 'styled-system'

interface SelectProps extends SpaceProps, LayoutProps {}

export const Select = styled.select.withConfig({
  shouldForwardProp,
})<SelectProps>`
  height: 40px;
  color: ${({ theme }) => theme.palette.textPrimary};
  font-family: ${({ theme }) => theme.fontFamilies.roboto};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 8px 15px 8px 15px;
  border: none;
  border-radius: 5px;
  outline: none;
  box-shadow: ${props =>
    `inset 0 0 0 1px ${props.theme.palette.borderPrimary}`};
  transition: box-shadow 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: ${props => `inset 0 0 0 2px ${props.theme.palette.borderBlue}`};
  }

  ${layout}
  ${space}
`
