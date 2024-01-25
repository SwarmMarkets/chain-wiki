import { ChangeEvent, forwardRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { LayoutProps, SpaceProps } from 'styled-system';
import {
  ErrorText,
  InputWrapper,
  StyledIcon,
  StyledInput,
  TextFieldWrapper,
} from './styled-components';
import { IconName } from '@src/shared/types/iconTypes';

interface TextFieldProps extends SpaceProps, LayoutProps {
  prependIcon?: IconName;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  inputProps?: React.ParamHTMLAttributes<HTMLInputElement> & LayoutProps;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { prependIcon, error, inputProps, placeholder, value, ...props },
    forwardedRef
  ) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const onFocusInput = () => {
      setIsFocused(true);
    };

    const onBlurInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
      inputProps?.onBlur && inputProps.onBlur(e);
      setIsFocused(false);
    };

    return (
      <TextFieldWrapper {...props}>
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
            type="text"
            ref={forwardedRef}
            value={value}
            placeholder={placeholder}
            $focused={isFocused}
            $prependIconExists={!!prependIcon}
            onFocus={onFocusInput}
            {...inputProps}
            onBlur={onBlurInput}
          />
        </InputWrapper>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </TextFieldWrapper>
    );
  }
);

export default TextField;
