'use client'

import React from 'react'
import Toast from './Toast'
import { createPortal } from 'react-dom'
import { useToastManager } from 'src/hooks/useToastManager'
import { usePortalTarget } from 'src/hooks/usePortalTarget'

const ToastManager: React.FC = () => {
  const { toasts, removeToast } = useToastManager()
  const container = usePortalTarget('#toasts')

  if (!container) return null

  return createPortal(
    <div
      className='fixed bottom-4 left-0 right-0 flex flex-col items-center space-y-4'
      style={{ zIndex: 1000 }}
    >
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    container
  )
}

export default ToastManager
