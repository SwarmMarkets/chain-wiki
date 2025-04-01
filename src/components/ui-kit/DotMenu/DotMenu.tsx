import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../Icon/Icon'
import IconButton from '../IconButton'
import useClickAway from '../hooks/useClickAway'

const menuVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
}

interface DotMenuProps {
  children: React.ReactNode
}

export const DotMenu: React.FC<DotMenuProps> = ({ children }) => {
  const { active, toggle, ref } = useClickAway()

  return (
    <div className='relative' ref={ref}>
      <IconButton onClick={toggle}>
        <Icon name='three-dots' size={20} className='text-main' />
      </IconButton>
      <AnimatePresence>
        {active && (
          <motion.ul
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={menuVariants}
            className='bg-paper border border-main absolute right-10 top-0 w-40 rounded-lg overflow-hidden z-10 p-2'
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DotMenu
