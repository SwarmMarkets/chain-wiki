import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'
import Icon from '../Icon/Icon'
import './styles.css'

interface CheckboxProps {
  className?: string
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
  CheckedIcon?: React.ReactNode
  UncheckedIcon?: React.ReactNode
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  disabled?: boolean
  noIconStyle?: boolean // New property to control icon styling
}

const Checkbox: React.FC<CheckboxProps> = ({
  defaultChecked = false,
  disabled = false,
  checked = false,
  noIconStyle = false,
  onChange,
  CheckedIcon,
  UncheckedIcon,
  inputProps,
  className,
}) => {
  return (
    <label className={clsx('ui-checkbox', className)}>
      <input
        type='checkbox'
        {...(checked !== undefined ? { checked } : { defaultChecked })}
        onChange={() => onChange?.(!checked)}
        onClick={e => e.stopPropagation()}
        {...inputProps}
        disabled={disabled}
      />
      <span className={clsx(!noIconStyle && 'ui-checkbox-icon')}>
        {checked
          ? CheckedIcon || <Icon name='check-bold' size={12} />
          : UncheckedIcon || null}
      </span>
    </label>
  )
}

export default Checkbox
