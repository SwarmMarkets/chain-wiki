import shouldForwardProp from '@styled-system/should-forward-prop'
import React from 'react'
import styled from 'styled-components'
import {
  space,
  color,
  typography,
  layout,
  SpaceProps,
  ColorProps,
  TypographyProps,
  LayoutProps,
} from 'styled-system'

const StyledSelect = styled.select.withConfig({
  shouldForwardProp,
})<StyledSelectProps>`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 4px;
  outline: none;

  font-family: ${({ theme }) => theme.fontFamilies.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.palette.textPrimary};
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${({ theme, disabled }) =>
      disabled ? theme.palette.borderPrimary : theme.palette.borderBlue};
    color: ${({ theme, disabled }) =>
      disabled ? theme.palette.textPrimary : theme.palette.borderBlue};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }

  ${space}
  ${color}
  ${typography}
  ${layout}
`

interface StyledSelectProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps {}

interface SelectProps extends StyledSelectProps {
  options: string[],
  value?: number,
  onChange?: (value: number) => void
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, ...props }) => {
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value)
    onChange && onChange(index)
  }

  return (
    <StyledSelect onChange={onChangeSelect} value={value} {...props}>
      {options.map((option, index) => (
        <option key={index} value={index}>
          {option}
        </option>
      ))}
    </StyledSelect>
  )
}

export default Select
