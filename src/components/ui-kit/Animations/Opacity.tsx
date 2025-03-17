import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeTransitionProps {
  children: ReactNode
  duration?: number
  className?: string
}

const Opacity = ({
  children,
  duration = 0.2,
  className,
}: FadeTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Opacity
