import { ButtonOption } from '@src/shared/types/ui-components'
import theme from '@src/theme'
import shouldForwardProp from '@styled-system/should-forward-prop'
import React from 'react'
import styled from 'styled-components'
import {
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  layout,
  space,
} from 'styled-system'

interface ButtonGroupProps extends SpaceProps, LayoutProps, FlexboxProps {
  options: ButtonOption[]
  selectedValue?: string
  onSelect: (value: string) => void
}

interface ButtonWrapperProps extends SpaceProps, LayoutProps, FlexboxProps {}

interface StyledButtonProps extends SpaceProps {
  selected: boolean
}

const ButtonWrapper = styled.div.withConfig({
  shouldForwardProp,
})<ButtonWrapperProps>`
  ${space}
  ${layout}
  display: flex;
  gap: 3px;
`

const StyledButton = styled.button.withConfig({
  shouldForwardProp,
})<StyledButtonProps>`
  ${space}

  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props =>
    props.selected
      ? props.theme.palette.linkPrimary
      : props.theme.palette.white};
  color: ${props =>
    props.selected
      ? props.theme.palette.white
      : props.theme.palette.textPrimary};

  &:hover {
    background-color: ${props =>
      props.selected
        ? theme.palette.linkPrimary
        : props.theme.palette.bgPrimary};
  }
`

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  selectedValue,
  onSelect,
  ...props
}) => {
  return (
    <ButtonWrapper {...props}>
      {options.map(option => (
        <StyledButton
          key={option.value}
          selected={option.value === selectedValue}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </StyledButton>
      ))}
    </ButtonWrapper>
  )
}

export default ButtonGroup
