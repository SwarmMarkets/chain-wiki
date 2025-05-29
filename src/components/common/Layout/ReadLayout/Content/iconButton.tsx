import clsx from 'clsx'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  hoverBackground?: string
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      hoverBackground = 'main',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          `flex items-center justify-center p-1.5 rounded-full 
          transition-all hover:bg-${hoverBackground} disabled:pointer-events-none
          disabled:opacity-50 disabled:cursor-auto`,
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton
