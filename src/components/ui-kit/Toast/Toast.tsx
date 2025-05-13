import { AnimatePresence, AnimationDefinition, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Icon from '../Icon/Icon'
import IconButton from '../IconButton'

type ToastProps = {
  toast: Omit<IToast, 'id'>
  duration?: number
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ toast, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)
  const type = toast.type || 'info'
  const isAction = !!(toast.actionHref && toast.actionText)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  const handleAnimationComplete = (
    deifinition: AnimationDefinition & { x: number }
  ) => {
    const isExit = deifinition.x === -100
    if (isExit) {
      onClose()
    }
  }

  const handleCloseButton = () => setIsVisible(false)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={handleAnimationComplete}
          className={`flex max-w-80 items-center p-2 bg-${type}-lightAccent text-main-accent rounded-lg`}
          style={{ zIndex: 100 }}
        >
          <div>
            <Icon
              width='20px'
              height='20px'
              name={`${type}-status`}
              color={type}
            />
          </div>
          <span className='ml-2 max-h-24 typo-label1 overflow-ellipsis overflow-hidden'>
            {toast.message}
          </span>
          {isAction && (
            <span
              className={`ml-2 px-1 py-0.5 typo-label1 text-${type} cursor-pointer rounded hover:bg-${type}-muted`}
              onClick={() => window.open(toast.actionHref)}
            >
              {toast.actionText}
            </span>
          )}
          <IconButton
            className='ml-2'
            hoverBackground={`${type}-muted`}
            onClick={handleCloseButton}
          >
            <Icon name='close' color={type} width='18px' height='18px' />
          </IconButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
