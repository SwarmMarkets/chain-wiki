import styled from 'styled-components';
import Text from '../Text';

interface IconContainerProps {
  $focused: boolean;
}

export const IconContainer = styled.div<IconContainerProps>`
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

export const StyledInput = styled.input<StyledInputProps>`
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

export const ErrorText = styled(Text)`
  margin-top: 4px;
  height: 16px;
  color: ${(props) => props.theme.palette.errorPrimary}
`

export const InputWrapper = styled.div`
  position: relative;
`;

export const TextFieldWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`;