import styled from 'styled-components'
import Text from '../Text'
import { LayoutProps, layout, space } from 'styled-system'
import Icon from '../Icon'
import shouldForwardProp from '@styled-system/should-forward-prop'

export const StyledIcon = styled(Icon)`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  transition: fill 0.3s;
`

interface StyledInputProps extends LayoutProps {
  focused: boolean
  prependIconExists: boolean
  error?: boolean
}

export const StyledInput = styled.input.withConfig({
  shouldForwardProp,
})<StyledInputProps>`
  color: ${({ theme }) => theme.palette.textPrimary};
  font-family: ${({ theme }) => theme.fontFamilies.roboto};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 8px 15px 8px ${props => (props.prependIconExists ? '35px' : '15px')};
  border: none;
  border-radius: 5px;
  outline: none;
  box-shadow: ${props =>
    props.focused
      ? `inset 0 0 0 2px ${
          props.error
            ? props.theme.palette.errorPrimary
            : props.theme.palette.borderBlue
        }`
      : `inset 0 0 0 1px ${
          props.error
            ? props.theme.palette.errorPrimary
            : props.theme.palette.borderBlue
        }`};
  transition: box-shadow 0.3s;
  box-sizing: border-box;
  width: 100%;
  ${layout}
`

export const ErrorText = styled(Text)`
  /* margin-top: 4px;
  height: 16px; */
  font-size: ${({ theme }) => theme.fontSizes.small};
  position: absolute;
  bottom: -16px;
  color: ${props => props.theme.palette.errorPrimary};
`

export const InputWrapper = styled.div`
  position: relative;
`

export const TextFieldWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  ${space}
  ${layout}
`
