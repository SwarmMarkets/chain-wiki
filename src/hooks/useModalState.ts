import { useState } from 'react'

const useModalState = (initialValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(initialValue || false)

  return {
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
    isOpen,
  }
}

export default useModalState
