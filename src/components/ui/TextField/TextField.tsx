import { ChangeEvent, forwardRef, useState } from 'react'
import { useTheme } from 'styled-components'
import { LayoutProps, SpaceProps } from 'styled-system'
import {
  ErrorText,
  InputWrapper,
  StyledIcon,
  StyledInput,
  TextFieldWrapper,
} from './styled-components'
import { IconName } from 'src/shared/types/ui-components'
import Text from '../Text'

interface TextFieldProps extends SpaceProps, LayoutProps {
  prependIcon?: IconName
  placeholder?: string
  error?: string | null
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  inputProps?: React.ParamHTMLAttributes<HTMLInputElement> & LayoutProps
  label?: string
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      prependIcon,
      error,
      inputProps,
      placeholder,
      value,
      label,
      onChange,
      ...props
    },
    forwardedRef
  ) => {
    const theme = useTheme()
    const [isFocused, setIsFocused] = useState(false)

    const onFocusInput = () => {
      setIsFocused(true)
    }

    const onBlurInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
      inputProps?.onBlur && inputProps.onBlur(e)
      setIsFocused(false)
    }

    return (
      <TextFieldWrapper {...props}>
        {label && (
          <Text fontWeight={theme.fontWeights.medium} mb='0.5em'>
            {label}
          </Text>
        )}
        <InputWrapper>
          {prependIcon && (
            <StyledIcon
              name={prependIcon}
              width={20}
              height={20}
              color={
                isFocused
                  ? theme.palette.textPrimary
                  : theme.palette.iconPrimary
              }
            />
          )}
          <StyledInput
            type='text'
            ref={forwardedRef}
            value={value}
            placeholder={placeholder}
            focused={isFocused}
            prependIconExists={!!prependIcon}
            onFocus={onFocusInput}
            onChange={onChange}
            error={!!error}
            {...inputProps}
            onBlur={onBlurInput}
          />
        </InputWrapper>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </TextFieldWrapper>
    )
  }
)

export default TextField
