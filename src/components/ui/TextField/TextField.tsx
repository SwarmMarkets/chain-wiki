import { ChangeEvent, ReactNode, forwardRef, useState } from 'react'
import {
  ErrorText,
  IconContainer,
  InputWrapper,
  StyledInput,
  TextFieldWrapper
} from './styled-components'

interface TextFieldProps extends React.ParamHTMLAttributes<HTMLInputElement> {
  prependIcon?: ReactNode
  placeholder?: string
  error?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ prependIcon, error, ...props }, forwardedRef) => {
    const [isFocused, setIsFocused] = useState(false)

    const onFocusInput = () => setIsFocused(true)

    const onBlurInput = () => setIsFocused(false)

    return (
      <TextFieldWrapper>
        <InputWrapper>
          {prependIcon && <IconContainer $focused={isFocused}>{prependIcon}</IconContainer>}
          <StyledInput
            type="text"
            ref={forwardedRef}
            $focused={isFocused}
            $prependIconExists={!!prependIcon}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            {...props}
          />
        </InputWrapper>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </TextFieldWrapper>
    )
  }
)

export default TextField
