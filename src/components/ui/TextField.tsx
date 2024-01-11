import React, { ChangeEvent, ReactNode, useState } from 'react';
import styled from 'styled-components';

interface TextFieldProps {
  prependIcon?: ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldWrapper = styled.div`
  position: relative;
`;

interface IconContainerProps {
  $focused: boolean;
}

const IconContainer = styled.div<IconContainerProps>`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);

  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) =>
      props.$focused
        ? props.theme.palette.textPrimary
        : props.theme.palette.iconPrimary};
    transition: fill 0.3s;
  }
`;

interface StyledInputProps {
  $focused: boolean;
  $prependIconExists: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  color: ${({ theme }) => theme.palette.textPrimary};
  font-family: ${({ theme }) => theme.fontFamilies.roboto};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 8px 15px 8px
    ${(props) => (props.$prependIconExists ? '35px' : '15px')};
  border: none;
  border-radius: 5px;
  outline: none;
  box-shadow: ${(props) =>
    props.$focused
      ? `inset 0 0 0 2px ${props.theme.palette.borderBlue}`
      : `inset 0 0 0 1px ${props.theme.palette.borderPrimary}`};
  transition: box-shadow 0.3s;
  box-sizing: border-box;
  width: fit-content;
`;

const TextField: React.FC<TextFieldProps> = ({ prependIcon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocusInput = () => setIsFocused(true);

  const onBlurInput = () => setIsFocused(false);

  return (
    <TextFieldWrapper>
      {prependIcon && (
        <IconContainer $focused={isFocused}>{prependIcon}</IconContainer>
      )}
      <StyledInput
        type="text"
        $focused={isFocused}
        $prependIconExists={!!prependIcon}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        {...props}
      />
    </TextFieldWrapper>
  );
};

export default TextField;
