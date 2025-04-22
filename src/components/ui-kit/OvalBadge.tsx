import clsx from 'clsx'
import React from 'react'

export interface TabProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  active?: boolean
}

const OvalBadge: React.FC<TabProps> = ({
  children,
  className,
  active,
  ...props
}) => {
  const baseClasses = clsx(
    'text-main typo-label2 py-0.5 px-3 rounded-3xl box-border border cursor-pointer',
    'hover:text-main-accent focus:border-main-active transition-all',
    !active && 'hover:border-main-hover'
  )

  const activeClasses = clsx('text-main-accent border-main-active bg-paper')

  return (
    <div
      className={`${baseClasses} ${
        active ? activeClasses : 'border-transparent'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default OvalBadge
