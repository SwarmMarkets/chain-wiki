import { ReactNode } from 'react'
import { useToastStore } from 'src/shared/store/useToastStore'

export const useToastManager = () => {
  const toasts = useToastStore(state => state.toasts)
  const addToast = useToastStore(state => state.addToast)
  const removeToast = useToastStore(state => state.removeToast)

  return {
    toasts,
    addToast: (message: ReactNode, options?: AddToastOptions) =>
      addToast(message, options),
    removeToast,
  }
}
