import React from 'react'
import { EditNodeModel } from './types'

const Placeholder: React.FC<{ depth: number; parent?: EditNodeModel }> = ({
  depth,
  parent,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: 4,
        left: (parent?.data?.type === 'group' ? 0 : depth) * 24,
        transform: 'translateY(-50%)',
        backgroundColor: '#81a9e0',
        zIndex: 100,
      }}
    />
  )
}

export default Placeholder
