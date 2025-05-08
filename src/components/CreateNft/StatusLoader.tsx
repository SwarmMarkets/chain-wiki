import React from 'react'
import Icon from '../ui-kit/Icon/Icon'

interface StatusLoaderProps {
  status: 'pending' | 'loading' | 'success'
}

const StatusLoader: React.FC<StatusLoaderProps> = ({ status }) => {
  return (
    <div className='flex items-center justify-center space-x-2'>
      {/* Pending */}
      {status === 'pending' && (
        <div className='w-8 h-8 rounded-full flex items-center justify-center bg-paper-accent'>
          <div className='w-2 h-2 rounded-full border-4 border-main-hover'></div>
        </div>
      )}

      {/* Loading */}
      {status === 'loading' && (
        <div className='w-8 h-8 rounded-full flex items-center justify-center bg-paper-accent relative'>
          <div className='absolute w-full h-full rounded-full border-2 border-primary border-t-transparent animate-spin'></div>
          <div className='w-2 h-2 rounded-full bg-primary'></div>
        </div>
      )}

      {/* Success */}
      {status === 'success' && (
        <div className='w-8 h-8 rounded-full flex items-center justify-center bg-paper-accent'>
          <div className='relative w-4 h-4 rounded-full bg-success flex items-center justify-center'>
            <Icon name='success-icon' className='w-3 h-3 fill-contrast' />
          </div>
        </div>
      )}
    </div>
  )
}

export default StatusLoader
