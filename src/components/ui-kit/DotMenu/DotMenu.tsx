import { AnimatePresence, motion } from 'framer-motion'
import Icon, { IconProps } from '../Icon/Icon'
import IconButton from '../IconButton'
import useClickAway from '../hooks/useClickAway'

const menuVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
}

interface DotMenuProps {
  children: React.ReactNode
  iconProps?: Partial<IconProps>
  loading?: boolean
}

export const DotMenu: React.FC<DotMenuProps> = ({
  children,
  iconProps,
  loading,
}) => {
  const { active, toggle, ref } = useClickAway()

  return (
    <div className='relative' ref={ref}>
      <IconButton disabled={loading} onClick={toggle}>
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
      <AnimatePresence>
        {active && (
          <motion.ul
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={menuVariants}
            onClick={toggle}
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
