import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { RadioButtonProps } from './RadioButton'
import clsx from 'clsx'

import './styles.css'

interface RadioButtonGroupProps<T>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  onChange: (value: T) => void
  value: T
  children: ReactNode
}

const RadioButtonGroup = <T,>({
  onChange,
  value,
  children: childrenProp,
  className,
  ...props
}: RadioButtonGroupProps<T>) => {
  if (React.Children.toArray(childrenProp).length < 2) {
    throw new Error('RadioButtonGroup requires at least two children')
  }

  const handleRadioButtonClick = (props: RadioButtonProps) => {
    onChange(props.value as T)
  }

  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement<RadioButtonProps>(child)) {
      return null
    }

    return React.cloneElement(child as ReactElement<RadioButtonProps>, {
      onChange() {
        handleRadioButtonClick(child.props)
      },
      checked: value === child.props.value,
    })
  })

  return (
    <div className={clsx('flex gap-3', className)} {...props}>
      {children}
    </div>
  )
}

export default RadioButtonGroup
