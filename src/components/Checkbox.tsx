import React from 'react'
import styled from 'styled-components'
import Icon from './ui/Icon'
import theme from '@src/theme'

interface CheckboxProps extends React.HTMLAttributes<HTMLLabelElement> {
  className?: string
  checked: boolean
  onChange: () => void
}

const CheckboxContainer = styled.label`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
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
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};;
  border-radius: 3px;
  background-color: ${props => (props.checked ? props.theme.palette.borderBlue : props.theme.palette.white)};
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
  onChange,
}) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} onChange={onChange} />
    <StyledCheckbox checked={checked}>
      <CheckmarkIcon name='checkmark' size={16} color={theme.palette.white} style={{ opacity: checked ? 1 : 0 }} />
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox
