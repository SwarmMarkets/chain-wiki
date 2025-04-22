import React from 'react'
import Icon from '../Icon/Icon'
import clsx from 'clsx'

export type ValueType = string | number
export interface OptionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  onClick?: (value: ValueType) => void
  value: ValueType
  selected?: boolean
  selectable?: boolean
}

const Option: React.FC<OptionProps> = ({
  children,
  selected,
  selectable = true,
  value,
  onClick,
  className,
  ...props
}) => {
  const handleClick = () => selectable && onClick?.(value)

  return (
    <div
      onClick={handleClick}
      className={clsx('ui-options-item', className)}
      {...props}
    >
      {children}
      {selected && <Icon name='check' color='primary' />}
    </div>
  )
}

export default Option
