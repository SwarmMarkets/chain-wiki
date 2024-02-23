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

const SelectContainer = styled.div.withConfig({
  shouldForwardProp,
})<StyledContainerProps>`
  position: relative;
`

const StyledSelect = styled.select`
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

interface Option {
  label: string
  value: string
}

interface StyledContainerProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps {}

interface SelectProps extends StyledContainerProps {
  options: Option[]
}

const Select: React.FC<SelectProps> = ({ options, ...props }) => {
  return (
    <SelectContainer {...props}>
      <StyledSelect>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  )
}

export default Select
