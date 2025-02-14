import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import useClickAway from '../hooks/useClickAway'

interface MenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  buttonRef?: React.RefObject<HTMLElement>
}

const Menu: React.FC<MenuProps> = ({
  anchorEl,
  open,
  children,
  onClose,
  className,
}) => {
  const { ref } = useClickAway(e => {
    if (!anchorEl?.contains(e.target as Node)) {
      onClose()
    }
  })

  if (!anchorEl || !open) return null

  // Calculate menu position based on the anchor element
  const { bottom, left } = anchorEl.getBoundingClientRect()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className={clsx(
            'absolute bg-paper rounded-md shadow-lg border border-gray-200 z-50 py-3 px-2',
            className
          )}
          style={{
            top: bottom + window.scrollY,
            left: left + window.scrollX,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Menu
