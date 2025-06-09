import { Toast, ToastType } from 'src/components/ui-kit/Toast/types'
import { create } from 'zustand'

interface ToastStore {
  toasts: Toast[]
  nextId: number
  addToast: (
    message: React.ReactNode,
    options?: Omit<Toast, 'id' | 'message'>
  ) => void
  removeToast: (id: number) => void
}

export const useToastStore = create<ToastStore>(set => ({
  toasts: [],
  nextId: 1,
  addToast: (message, options) =>
    set(state => {
      const type: ToastType = options?.type || 'info'
      const newToast: Toast = {
        id: state.nextId,
        message,
        type,
        ...options,
      }

      const updatedToasts =
        state.toasts.length >= 5
          ? [...state.toasts.slice(1), newToast]
          : [...state.toasts, newToast]

      return {
        toasts: updatedToasts,
        nextId: state.nextId + 1,
      }
    }),
  removeToast: id =>
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    })),
}))
