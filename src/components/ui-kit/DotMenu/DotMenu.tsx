import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import Icon, { IconProps } from '../Icon/Icon'
import IconButton from '../IconButton'
import useClickAway from '../hooks/useClickAway'

const menuVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
}

export type MenuPosition = 'left' | 'right'

interface DotMenuProps {
  children: React.ReactNode
  iconProps?: Partial<IconProps>
  loading?: boolean
  position?: MenuPosition
}

export const DotMenu: React.FC<DotMenuProps> = ({
  children,
  iconProps,
  loading,
  position = 'left',
}) => {
  const { active, toggle, ref } = useClickAway()
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!active) {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        setMenuPosition({
          top: rect.top + window.scrollY,
          left: position === 'right' ? rect.right + 10 : rect.left - 170, // 170 = menu width (160) + offset (10)
        })
      }
    }
    toggle()
  }

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <>
      <div className='relative' ref={ref} onClick={handleMenuClick}>
        <IconButton disabled={loading} onClick={handleToggle}>
          {loading ? (
            <div className='loader' />
          ) : (
            <Icon
              name='three-dots'
              size={20}
              className='text-main'
              {...iconProps}
            />
          )}
        </IconButton>
      </div>
      {createPortal(
        <AnimatePresence>
          {active && (
            <motion.ul
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={menuVariants}
              onClick={handleMenuClick}
              className='fixed bg-paper border border-main w-40 rounded-lg overflow-hidden z-50 p-2 shadow-lg'
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
              }}
            >
              {children}
            </motion.ul>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default DotMenu
