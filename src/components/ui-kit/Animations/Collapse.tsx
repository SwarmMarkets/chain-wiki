import { motion } from 'framer-motion'
import React, { forwardRef } from 'react'

interface CollapseProps {
  children: React.ReactNode
  className?: string
}

const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  ({ children, className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        key='content'
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    )
  }
)

Collapse.displayName = 'Collapse'

export default Collapse
