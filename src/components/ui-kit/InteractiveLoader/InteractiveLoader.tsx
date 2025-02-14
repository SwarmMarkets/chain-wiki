import clsx from 'clsx'
import { useState } from 'react'
import useDebounceCallback from 'src/common/hooks/helpers/useDebounceCallback'
import useInterval from 'src/common/hooks/helpers/useInterval'
import IconButton from '../IconButton'
import Tooltip from '../Tooltip/Tooltip'
import { UiKit } from '../types'

interface InteractiveLoaderProps {
  size?: UiKit.Sizes
  className?: string
  callback: () => void
  loading: boolean
  delay: number
  tooltip?: ((remainingTime: number) => string) | string
}

const MAX_PROGRESS = 100
const INITIAL_UPDATE_INTERVAL = 1000

const InteractiveLoader: React.FC<InteractiveLoaderProps> = ({
  className,
  callback,
  loading = false,
  delay = 5000,
  tooltip,
  size = 'md',
}) => {
  const [progress, setProgress] = useState(0)
  const [isResetting, setIsResetting] = useState(false)

  const executeCallback = useDebounceCallback(() => {
    setIsResetting(true)
    callback?.()
    setProgress(0)
    setTimeout(() => setIsResetting(false), 100) // Re-enable transition after reset
  }, 100)

  const updateInterval = loading ? null : INITIAL_UPDATE_INTERVAL

  useInterval(() => {
    setProgress(prev => {
      const onePercent = (INITIAL_UPDATE_INTERVAL * MAX_PROGRESS) / delay
      const newProgress = prev + onePercent
      return newProgress
    })

    if (progress >= MAX_PROGRESS) {
      executeCallback()
    }
  }, updateInterval)

  const sizeClasses = {
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-12',
  }

  const iconButtonClasses = clsx(
    className,
    'p-1.5 -rotate-90',
    sizeClasses[size]
  )

  const iconClasses = clsx(
    'size-full transition-all duration-150',
    loading && 'animate-spin'
  )

  const strokeDashOffset = loading ? 40 : MAX_PROGRESS - progress
  const remainingTime = (delay - (delay / MAX_PROGRESS) * progress) / 1000
  const tooltipContent =
    !loading &&
    (typeof tooltip === 'function' ? tooltip(remainingTime) : tooltip)

  return (
    <Tooltip content={tooltipContent}>
      <IconButton
        onClick={executeCallback}
        className={iconButtonClasses}
        disabled={loading}
        hoverBackground='paper-hover'
      >
        <svg
          className={iconClasses}
          viewBox='0 0 36 36'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='18'
            cy='18'
            r='16'
            fill='none'
            className='stroke-gray-200'
            strokeWidth='3.6'
          />
          <circle
            cx='18'
            cy='18'
            r='16'
            fill='none'
            className='stroke-primary'
            strokeWidth='3.6'
            strokeDasharray='100'
            strokeDashoffset={strokeDashOffset}
            style={{
              transition:
                isResetting || loading
                  ? 'none'
                  : 'stroke-dashoffset 1.1s linear', // Disable transition on reset
            }}
            strokeLinecap='round'
          />
        </svg>
      </IconButton>
    </Tooltip>
  )
}

export default InteractiveLoader
