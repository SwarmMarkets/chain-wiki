import clsx from 'clsx'
import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { BadgeProps } from './Badge'

interface SingleValueProps<T> {
  multiselect?: false
  value: T
  onChange: (value: T) => void
}

interface MultiValueProps<T> {
  multiselect: true
  value: T[]
  onChange: (value: T[]) => void
}

type BadgeGroupProps<T> = (SingleValueProps<T> | MultiValueProps<T>) &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    children: ReactNode
  }

const BadgeGroup = <T,>({
  onChange,
  value,
  multiselect,
  children: childrenProp,
  className,
  ...props
}: BadgeGroupProps<T>) => {
  if (React.Children.toArray(childrenProp).length < 2) {
    throw new Error('BadgeGroup requires at least two children')
  }

  const handleBadgeClick = (props: BadgeProps<T>) => {
    const badgeValue = props.value
    if (!badgeValue) return

    if (multiselect) {
      const index = (value as T[]).indexOf(badgeValue)
      const newValues = [...(value as T[])]
      if (index > -1) {
        newValues.splice(index, 1) // Deselect if already selected
      } else {
        newValues.push(badgeValue) // Select if not selected
      }

      onChange(newValues)
    } else {
      onChange(badgeValue)
    }
  }

  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) {
      return null
    }

    return React.cloneElement<BadgeProps<T>>(child as ReactElement, {
      onClick: () => handleBadgeClick(child.props),
      active: multiselect
        ? (value as T[]).includes(child.props.value)
        : value === child.props.value,
    })
  })

  return (
    <div className={clsx('flex flex-row gap-3', className)} {...props}>
      {children}
    </div>
  )
}

export default BadgeGroup
