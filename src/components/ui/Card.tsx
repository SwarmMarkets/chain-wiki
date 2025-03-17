import clsx from 'clsx'
import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({
  onClick,
  children,
  className,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx('bg-paper rounded-lg p-4 border border-main', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
