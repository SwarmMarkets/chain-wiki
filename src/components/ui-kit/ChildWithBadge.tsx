import clsx from 'clsx'
import React from 'react'

interface ChildWithBadgeProps {
  children: React.ReactNode
  badgeIcon: React.ReactNode
  badgeSize?: number
  className?: string
}

const ChildWithBadge: React.FC<ChildWithBadgeProps> = ({
  children,
  badgeIcon,
  className,
  badgeSize = 16,
}) => {
  return (
    <div className={clsx(className, 'relative inline-block')}>
      {/* Render the child */}
      {children}

      {/* Badge positioned at the bottom-right */}
      <div
        className='absolute bottom-0 right-0 flex items-center justify-center rounded-full overflow-hidden'
        style={{
          width: badgeSize,
          height: badgeSize,
        }}
      >
        {badgeIcon}
      </div>
    </div>
  )
}

export default ChildWithBadge
