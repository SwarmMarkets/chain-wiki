'use client'

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import './styles.css'
import clsx from 'clsx'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content?: ReactNode
  position?: TooltipPosition
  className?: string
  children: ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  className,
  children,
}) => {
  const [adjustedPosition, setAdjustedPosition] = useState(position)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tooltipEl = tooltipRef.current
    if (!tooltipEl) return

    const { top, left, right, bottom } = tooltipEl.getBoundingClientRect()
    const { innerWidth, innerHeight } = window

    if (position === 'top' && top < 0) setAdjustedPosition('bottom')
    else if (position === 'bottom' && bottom > innerHeight)
      setAdjustedPosition('top')
    else if (position === 'left' && left < 0) setAdjustedPosition('right')
    else if (position === 'right' && right > innerWidth)
      setAdjustedPosition('left')
  }, [position])

  if (!content) return children

  return (
    <div className='relative inline-block group w-max'>
      <div
        ref={tooltipRef}
        className={clsx('ui-tooltip', adjustedPosition, className)}
      >
        {content}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Tooltip
