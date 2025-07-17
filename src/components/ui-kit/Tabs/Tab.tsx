import React from 'react'
import clsx from 'clsx'
import { useTabContext } from './context'

export interface TabProps {
  value: string
  label: string
  onChange?: (value: string) => void
}

const Tab: React.FC<TabProps> = ({ value, label, onChange }) => {
  const activeValue = useTabContext()

  if (activeValue === null) {
    throw new TypeError('No TabContext provided')
  }

  return (
    <div
      onClick={() => onChange && onChange(value)}
      className={clsx(
        'px-4 py-2 cursor-pointer',
        activeValue === value
          ? 'border-b-2 border-primary-accent text-primary-accent'
          : 'text-black',
        'hover:text-primary transition-colors'
      )}
    >
      {label}
    </div>
  )
}

export default Tab
