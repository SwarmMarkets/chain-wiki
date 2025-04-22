import clsx from 'clsx'
import React from 'react'

export interface TabProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  color?: string
}

const Alert: React.FC<TabProps> = ({
  children,
  className,
  color,
  ...props
}) => {
  const baseClasses = clsx(
    `text-${color}-accent typo-label1 p-2 rounded-md bg-${color}-muted`,
    className
  )

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  )
}

export default Alert
