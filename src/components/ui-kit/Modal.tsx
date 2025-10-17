'use client'

import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { MouseEvent, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Fade from './Animations/Fade'
import Slide from './Animations/Slide'
import IconButton from './IconButton'
import Icon from './Icon/Icon'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'
import { usePortalTarget } from 'src/hooks/usePortalTarget'

export interface ModalProps {
  open?: boolean
  children?: ReactNode
  className?: string
  onClose?: () => void
  hideCloseButton?: boolean
}

const CloseButton = ({ onClose }: Pick<ModalProps, 'onClose'>) => {
  return (
    <IconButton className='absolute right-1 top-1' onClick={onClose}>
      <Icon name='close' />
    </IconButton>
  )
}

const Modal: React.FC<ModalProps> = ({
  open,
  children,
  className,
  onClose,
  hideCloseButton = false,
}: ModalProps) => {
  const isSm = useBreakpoint('sm')

  const container = usePortalTarget('#modals')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const modalClasses = clsx(
    'relative transform overflow-hidden bg-paper shadow-xl',
    'sm:my-8 sm:w-full sm:max-w-lg sm:rounded-md p-4', // Desktop classes
    'rounded-t-md w-full max-w-full' // Mobile classes
  )

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onClose?.()
  }

  if (!container) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className='relative z-10' role='dialog' aria-modal='true'>
          <Fade scale={1} className='overlay' aria-hidden='true' />

          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div
              onClick={handleClose}
              className={clsx(
                'flex min-h-full',
                'p-0 items-end justify-stretch xs:justify-center sm:items-center sm:p-4' // Mobile classes
              )}
            >
              {isSm ? (
                <Slide
                  onClick={e => e.stopPropagation()}
                  className={clsx(modalClasses, className)}
                  position={'bottom'}
                >
                  {!hideCloseButton && <CloseButton onClose={onClose} />}
                  {children}
                </Slide>
              ) : (
                <Fade
                  onClick={e => e.stopPropagation()}
                  scale={0.9}
                  className={clsx(modalClasses, className)}
                >
                  {!hideCloseButton && <CloseButton onClose={onClose} />}
                  {children}
                </Fade>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    container
  )
}

export default Modal
