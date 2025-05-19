import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../Icon/Icon'
import IconButton from '../IconButton'
import { ToastType } from 'src/shared/types/toast-types'

export interface Toast {
  id: number
  message: React.ReactNode
  type?: ToastType
  actionHref?: string
  actionText?: string
}

interface ToastComponentProps {
  toast: Toast
  duration?: number
  onClose: () => void
}

type IconName =
  | 'info-status'
  | 'success-status'
  | 'warn-status'
  | 'error-status'
  | 'close'

const iconMap: Record<ToastType, IconName> = {
  info: 'info-status',
  success: 'success-status',
  warn: 'warn-status',
  error: 'error-status',
}

const Toast: React.FC<ToastComponentProps> = ({
  toast,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const type = toast.type || 'info'
  const isAction = !!(toast.actionHref && toast.actionText)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  const handleAnimationComplete = () => {
    if (!isVisible) {
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
          className={`flex max-w-80 items-center p-2 rounded-lg text-main-accent bg-${type}-lightAccent`}
          style={{ zIndex: 100 }}
        >
          <div>
            <Icon width={20} height={20} name={iconMap[type]} color={type} />
          </div>
          <span className='ml-2 max-h-24 typo-label1 overflow-ellipsis overflow-hidden'>
            {toast.message}
          </span>
          {isAction && (
            <span
              className={`ml-2 px-1 py-0.5 typo-label1 text-${type} cursor-pointer rounded hover:bg-${type}-muted`}
              onClick={() => window.open(toast.actionHref, '_blank')}
            >
              {toast.actionText}
            </span>
          )}
          <IconButton
            className='ml-2'
            hoverBackground={`${type}-muted`}
            onClick={handleCloseButton}
          >
            <Icon name='close' color={type} width={18} height={18} />
          </IconButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
