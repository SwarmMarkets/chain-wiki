import styled from "styled-components";

export const Select = styled.select`
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
`