import clsx from 'clsx'
import React from 'react'
import { UiKit } from '../types'
import './styles.css'

export interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  color?: UiKit.Colors
  fullWidth?: boolean
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  disabled,
  className,
  ...props
}) => {
  const radioLabelClass = clsx('ui-radio', {
    'cursor-auto opacity-50': disabled,
    className,
  })

  return (
    <label className={radioLabelClass}>
      <input type='radio' disabled={disabled} className='peer' {...props} />
      <span className='ui-radio-input'></span>
      {label && <span className='ui-radio-text'>{label}</span>}
    </label>
  )
}

export default RadioButton
