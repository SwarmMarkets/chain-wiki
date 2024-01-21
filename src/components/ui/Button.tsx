import { ChildrenProp } from '@src/shared/types/common-props';
import styled from 'styled-components';

interface ButtonProps
  extends ChildrenProp,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton = styled.button`
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
    border-color: ${({ theme }) => theme.palette.borderBlue};
    color: ${({ theme }) => theme.palette.borderBlue};
  }
`;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
