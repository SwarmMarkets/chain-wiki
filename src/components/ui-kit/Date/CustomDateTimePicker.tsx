import React, { ReactNode } from 'react'
import DateTimePicker, { DateTimePickerProps } from './DateTimePicker'
import useClickAway from '../hooks/useClickAway'
import { motion } from 'framer-motion'

interface CustomDateTimePickerProps extends DateTimePickerProps {
  children: ReactNode
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  children,
  ...rest
}) => {
  const { ref, active, toggle } = useClickAway()

  return (
    <div ref={ref} className='relative z-50'>
      <div className='flex' onClick={toggle}>
        {children}
      </div>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DateTimePicker className='z-50 absolute mt-2' {...rest} />
        </motion.div>
      )}
    </div>
  )
}

export default CustomDateTimePicker
