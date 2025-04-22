import { motion } from 'framer-motion'
import React, { ComponentProps, forwardRef } from 'react'

interface SlideProps
  extends ComponentProps<ReturnType<typeof motion<undefined, 'div'>>> {
  position: 'left' | 'right' | 'bottom'
  children: React.ReactNode
  className?: string
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
  ({ position, children, className, ...props }, ref) => {
    const translateMap = {
      left: { initial: '-100%', exit: '-100%', axis: 'X' },
      right: { initial: '100%', exit: '100%', axis: 'X' },
      bottom: { initial: '100%', exit: '100%', axis: 'Y' },
    }

    const { initial, exit, axis } =
      translateMap[position] || translateMap.bottom

    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, [`translate${axis}`]: initial }}
        animate={{ opacity: 1, [`translate${axis}`]: '0%' }}
        exit={{ opacity: 0, [`translate${axis}`]: exit }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Slide.displayName = 'Slide'

export default Slide
