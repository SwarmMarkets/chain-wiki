import React from 'react'
import { LayoutProps, SpaceProps } from 'styled-system'

interface DividerProps extends SpaceProps, LayoutProps {
  color?: string
}

const Divider: React.FC<DividerProps> = () => {
  return <div className='h-px bg-gray-300 w-full'></div>
}

export default Divider
