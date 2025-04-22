import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'
import './styles.css'

interface SwitchProps {
  className?: string
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  disabled?: boolean
}

const Switch: React.FC<SwitchProps> = ({
  defaultChecked = false,
  disabled = false,
  checked = false,
  onChange,
  inputProps,
  className,
}) => {
  return (
    <label className={clsx('ui-switch', className)}>
      <input
        type='checkbox'
        {...(checked !== undefined ? { checked } : { defaultChecked })}
        onChange={() => onChange?.(!checked)}
        onClick={e => e.stopPropagation()}
        {...inputProps}
        disabled={disabled}
      />
      <span className='ui-switch-slider'></span>
    </label>
  )
}

export default Switch
