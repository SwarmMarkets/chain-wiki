import { ReactNode } from 'react'

export type ToastType = 'info' | 'success' | 'warn' | 'error'
export interface Toast {
  id: number
  message: ReactNode
  type?: ToastType
  actionHref?: string
  actionText?: string
}

export type ToastIconName =
  | 'info-status'
  | 'success-status'
  | 'warn-status'
  | 'error-status'
  | 'close'

export interface ToastComponentProps {
  toast: Toast
  duration?: number
  onClose: () => void
}
