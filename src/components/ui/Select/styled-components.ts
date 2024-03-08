import styled from 'styled-components'
import Text from '../Text'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { LayoutProps, SpaceProps, layout, space } from 'styled-system'

interface SelectWrapperProps extends SpaceProps, LayoutProps {}

export interface StyledSelectProps {
  error?: string
}

export const SelectWrapper = styled.div.withConfig({
  shouldForwardProp,
})<SelectWrapperProps>`
  position: relative;

  ${layout}
  ${space}
`

export const StyledSelect = styled.select.withConfig({
  shouldForwardProp,
})<StyledSelectProps>`
  height: 40px;
  color: ${({ theme }) => theme.palette.textPrimary};
  font-family: ${({ theme }) => theme.fontFamilies.roboto};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 8px 15px 8px 15px;
  border: none;
  border-radius: 5px;
  outline: none;
  box-shadow: ${props =>
    `inset 0 0 0 1px ${
      props.error
        ? props.theme.palette.errorPrimary
        : props.theme.palette.borderPrimary
    }`};
  transition: box-shadow 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: ${props =>
      `inset 0 0 0 2px ${
        props.error
          ? props.theme.palette.errorPrimary
          : props.theme.palette.borderBlue
      }`};
  }
`

export const ErrorText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.small};
  position: absolute;
  left: 0;
  bottom: -16px;
  color: ${props => props.theme.palette.errorPrimary};
`
