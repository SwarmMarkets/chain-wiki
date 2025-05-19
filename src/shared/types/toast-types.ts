import { ReactNode } from 'react'

export type ToastType = 'info' | 'success' | 'warn' | 'error'
export interface Toast {
  id: number
  message: ReactNode
  type?: ToastType
  actionHref?: string
  actionText?: string
}
