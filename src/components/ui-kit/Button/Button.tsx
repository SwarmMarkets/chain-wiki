import clsx from 'clsx'
import React, { ButtonHTMLAttributes } from 'react'
import { UiKit } from '../types'

import styles from './Button.module.css'

type ButtonVariants = 'text' | 'contained' | 'outlined'
type Adornment = React.ReactNode

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  size?: UiKit.Sizes
  color?: UiKit.Colors
  StartAdornment?: Adornment
  EndAdornment?: Adornment
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'md',
  color = 'primary',
  disabled,
  loading,
  StartAdornment,
  EndAdornment,
  children,
  className,
  ...props
}) => {
  const variantClasses = {
    contained: `bg-${color} text-${color}-contrast hover:bg-${color}-accent`,
    outlined: `bg-paper text-${color} shadow-[inset_0_0_0_1px] shadow-${color} hover:bg-${color}-muted`,
    text: `bg-paper text-${color} shadow-md hover:bg-${color}-muted`,
  }

  const sizeClasses = {
    sm: 'py-1.5 px-2.5',
    md: 'py-3 px-8',
    lg: 'py-4 px-8',
  }

  const buttonClasses = clsx(
    styles.base,
    sizeClasses[size],
    variantClasses[variant],
    { 'cursor-auto opacity-50 pointer-events-none': disabled },
    className
  )

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {StartAdornment && <span className='mr-2'>{StartAdornment}</span>}
      {loading ? <div className='loader' /> : children}
      {EndAdornment && <span className='ml-2'>{EndAdornment}</span>}
    </button>
  )
}

export default Button
