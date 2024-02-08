import React from 'react'
import styled from 'styled-components'
import Icon from './ui/Icon'
import theme from '@src/theme'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { space, SpaceProps } from 'styled-system'

interface CheckboxProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    SpaceProps {
  className?: string
  checked: boolean
  disabled?: boolean
  onChange: () => void
}

const CheckboxContainer = styled.label.withConfig({ shouldForwardProp })`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  ${space}
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 3px;
  background-color: ${props =>
    props.checked ? props.theme.palette.borderBlue : props.theme.palette.white};
`

const CheckmarkIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked,
  disabled,
  onChange,
  ...props
}) => (
  <CheckboxContainer className={className} {...props}>
    <HiddenCheckbox
      checked={checked}
      onChange={disabled ? undefined : onChange}
    />
    <StyledCheckbox checked={checked}>
      <CheckmarkIcon
        name='checkmark'
        size={16}
        color={theme.palette.white}
        style={{ opacity: checked ? 1 : 0 }}
      />
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox
