import { ChangeEvent, ReactNode, forwardRef, useState } from 'react'
import {
  ErrorText,
  IconContainer,
  InputWrapper,
  StyledInput,
  TextFieldWrapper
} from './styled-components'
import { LayoutProps, SpaceProps } from 'styled-system'

interface TextFieldProps extends SpaceProps, LayoutProps {
  prependIcon?: ReactNode
  placeholder?: string
  error?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  inputProps?: React.ParamHTMLAttributes<HTMLInputElement> & LayoutProps
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ prependIcon, error, inputProps, placeholder, value, ...props }, forwardedRef) => {
    const [isFocused, setIsFocused] = useState(false)

    const onFocusInput = () => setIsFocused(true)

    const onBlurInput = () => setIsFocused(false)

    return (
      <TextFieldWrapper {...props}>
        <InputWrapper>
          {prependIcon && <IconContainer $focused={isFocused}>{prependIcon}</IconContainer>}
          <StyledInput
            type="text"
            ref={forwardedRef}
            value={value}
            placeholder={placeholder}
            $focused={isFocused}
            $prependIconExists={!!prependIcon}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            {...inputProps}
          />
        </InputWrapper>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </TextFieldWrapper>
    )
  }
)

export default TextField
