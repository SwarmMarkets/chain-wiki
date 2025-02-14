import React from 'react'
import ReactDOM from 'react-dom'
import { HTMLMotionProps, motion } from 'framer-motion'
import Icon from '../Icon/Icon'
import useBreakpoint from 'src/common/hooks/ui/useBreakpoint'

interface SnowfallProps extends HTMLMotionProps<'div'> {
  snowballsAmount?: number
  repeat?: number
}

const SmtFall: React.FC<SnowfallProps> = ({
  repeat = Infinity,
  snowballsAmount,
  ...props
}) => {
  const isMd = useBreakpoint('md')
  const tokens = Array.from({ length: snowballsAmount || (isMd ? 30 : 50) }) // Adjust the number of tokens as needed

  const animationContent = (
    <div
      className='pointer-events-none fixed left-0 top-0 w-full h-screen bg-transparent'
      style={{
        zIndex: 60,
      }}
    >
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        {tokens.map((_, index) => {
          const size = Math.random() * 20 + 10 // Random size between 10px and 30px
          const startX = Math.random() * 100 // Random horizontal start position

          return (
            <motion.div
              {...props}
              key={index}
              className='absolute'
              initial={{
                top: '-10%', // Start above the screen
                x: `${startX}%`,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                top: '110%', // Fall beyond the bottom of the screen
                x: `${startX}%`,
                opacity: [0, 1, 1, 0], // Smooth opacity transition
                rotate: Math.random() * 360 + 360,
              }}
              transition={{
                duration: Math.random() * 2 + 4, // Animation lasts 4-6 seconds
                delay: index * 0.2 + Math.random() * 0.1, // Staggered delay for each token
                repeat,
              }}
              style={{ left: `${startX}%` }}
            >
              <div
                className='w-full h-full'
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                <Icon cdn name='SMT' />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  return ReactDOM.createPortal(
    animationContent,
    document.getElementById('root')!
  )
}

export default SmtFall
