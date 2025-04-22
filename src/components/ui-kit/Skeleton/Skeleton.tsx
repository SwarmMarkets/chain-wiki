import React from 'react'
import clsx from 'clsx'
import './styles.css'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  variant?: 'rect' | 'circle' | 'text'
  count?: number // To repeat the skeleton
  className?: string
  customStyles?: React.CSSProperties
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  variant = 'rect',
  count = 1,
  className,
  customStyles,
}) => {
  const skeletonClass = clsx(
    'ui-skeleton',
    {
      'ui-skeleton-rect': variant === 'rect',
      'ui-skeleton-circle': variant === 'circle',
      'ui-skeleton-text': variant === 'text',
    },
    className
  )

  const skeletons = Array(count)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className={skeletonClass}
        style={{
          width,
          height,
          ...customStyles,
        }}
      />
    ))

  return <>{skeletons}</>
}

export default Skeleton
