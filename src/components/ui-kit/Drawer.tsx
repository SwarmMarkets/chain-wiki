import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import Slide from './Animations/Slide'
import useClickAway from './hooks/useClickAway'
import { ModalProps } from './Modal'
import Fade from './Animations/Fade'
import Icon from './Icon/Icon'
import IconButton from './IconButton'
import ReactPortal from '../ReactPortal'

export interface DrawerProps extends ModalProps {
  position?: 'left' | 'right'
}

const Drawer: React.FC<DrawerProps> = ({
  open = false,
  children,
  className,
  position = 'left',
  onClose,
}: DrawerProps) => {
  const { ref: drawerRef, setActive } = useClickAway(onClose)

  useEffect(() => {
    // Disable scroll when the drawer is open
    document.body.style.overflow = open ? 'hidden' : ''

    setActive(!!open)
  }, [open, setActive])

  const drawerClasses = clsx(
    'relative transform overflow-hidden bg-paper shadow-xl',
    'w-full max-w-lg px-4 py-2'
  )

  const positionMap = {
    left: 'justify-start',
    right: 'justify-end',
  }

  return (
    <ReactPortal wrapperId='drawers'>
      <AnimatePresence>
        {open && (
          <div className='relative z-50' role='dialog' aria-modal='true'>
            <Fade scale={1} className='overlay' aria-hidden='true' />

            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
              <div
                className={clsx(
                  'flex min-h-full',
                  'items-stretch',
                  positionMap[position]
                )}
              >
                <Slide
                  ref={drawerRef}
                  className={clsx(drawerClasses, className)}
                  position={position}
                >
                  <IconButton
                    className='absolute right-1 top-1'
                    onClick={onClose}
                  >
                    <Icon name='close' />
                  </IconButton>

                  {children}
                </Slide>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </ReactPortal>
  )
}

export default Drawer
