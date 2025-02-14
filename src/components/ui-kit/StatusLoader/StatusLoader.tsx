import React from 'react'
import Icon from '../Icon/Icon'

interface StatusLoaderProps {
  status: 'pending' | 'loading' | 'success'
}

const StatusLoader: React.FC<StatusLoaderProps> = ({ status }) => {
  return (
    <div className='flex items-center justify-center space-x-2'>
      {/* Inactive point is always visible */}
      {status === 'pending' && (
        <div className='w-8 h-8 rounded-full flex items-center justify-center bg-paper-accent'>
          <div className='w-2 h-2 rounded-full border-main-hover border-4'></div>
        </div>
      )}

      {/* Active point */}
      {status === 'loading' && (
        <div className='w-8 h-8 rounded-full flex items-center justify-center relative bg-paper-accent'>
          {/* animation */}
          <div className='absolute w-full h-full rounded-full border-2 border-primary border-t-transparent animate-spin'></div>
          <div className='w-2 h-2 rounded-full bg-primary'></div>
        </div>
      )}

      {/* Completed point */}
      {status === 'success' && (
        <div className='w-8 h-8 rounded-full flex items-center justify-center bg-paper-accent'>
          <div className='relative w-4 h-4 bg-blue rounded-full flex items-center justify-center'>
            <Icon name='success-icon' />
          </div>
        </div>
      )}
    </div>
  )
}

export default StatusLoader
