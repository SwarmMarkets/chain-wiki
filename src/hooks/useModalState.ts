import { useState } from 'react'

const useModalState = (initialValue: boolean) => {
  const [isOpen, setIsOpen] = useState(initialValue)

  return {
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
    isOpen
  }
}

export default useModalState
