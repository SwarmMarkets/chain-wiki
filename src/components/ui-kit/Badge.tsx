import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'
import { UiKit } from './types'

type BadgeVariants = 'text' | 'contained' | 'outlined'

export type BadgeType = 'default' | 'status'
export type BadgeValue = string | number

export interface BadgeProps<T>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onClick'> {
  variant?: BadgeVariants
  value?: T
  size?: UiKit.Sizes
  color?: UiKit.Colors
  active?: boolean
  badgeType?: BadgeType
  onClick?: (value?: T) => void
}

const Badge = <T,>({
  size = 'md',
  color = 'primary',
  active,
  disabled,
  children,
  className,
  badgeType = 'default',
  value,
  onClick,
  ...props
}: BadgeProps<T>) => {
  const borderColor = active ? `border-main-active` : `border-${color}-accent`

  const badgeTypeClasses = {
    default: clsx(
      `border ${borderColor} bg-${color} text-${color}-contrast enabled:hover:bg-${color}-accent`,
      !active && `hover:border-${color}-accent`
    ),
    status: `bg-${color}-muted text-${color}`,
  }

  const sizeClasses = {
    sm: 'py-0 px-1',
    md: 'py-0.5 px-2.5',
    lg: 'py-1 px-4 text-label2',
  }

  const badgeClass = clsx(
    'inline-flex items-center justify-center transition-all',
    'w-max box-border text-label1 font-medium rounded-md',
    badgeTypeClasses[badgeType],
    sizeClasses[size],
    { 'cursor-auto opacity-50': disabled },
    className
  )

  const handleClick = () => {
    onClick?.(value)
  }

  return (
    <button
      className={badgeClass}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Badge
