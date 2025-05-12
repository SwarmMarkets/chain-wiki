import { HTMLMotionProps, motion } from 'framer-motion'
import React, { forwardRef } from 'react'

interface CollapseProps extends Partial<HTMLMotionProps<'div'>> {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  ({ children, className, direction = 'down', ...rest }, ref) => {
    const isVertical = direction === 'up' || direction === 'down'
    const isReversed = direction === 'up' || direction === 'left'

    return (
      <motion.div
        ref={ref}
        className={className}
        key='content'
        initial={
          isVertical
            ? {
                height: 0,
                opacity: 0,
                transformOrigin: isReversed ? 'top' : 'bottom',
              }
            : {
                width: 0,
                opacity: 0,
                transformOrigin: isReversed ? 'left' : 'right',
              }
        }
        animate={
          isVertical
            ? { height: 'auto', opacity: 1 }
            : { width: 'auto', opacity: 1 }
        }
        exit={isVertical ? { height: 0, opacity: 0 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{
          overflow: 'hidden',
          display: isVertical ? 'block' : 'inline-block',
        }}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }
)

Collapse.displayName = 'Collapse'

export default Collapse
