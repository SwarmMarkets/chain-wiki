import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { RadioButtonProps } from './RadioButton'
import clsx from 'clsx'

import './styles.css'

interface RadioButtonGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  onChange: (value: RadioButtonProps['value']) => void
  value: RadioButtonProps['value']
  children: ReactNode
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  onChange,
  value,
  children: childrenProp,
  className,
  ...props
}) => {
  if (React.Children.toArray(childrenProp).length < 2) {
    throw new Error('RadioButtonGroup requires at least two children')
  }

  const handleRadioButtonClick = (props: RadioButtonProps) => {
    onChange(props.value)
  }

  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) {
      return null
    }

    return React.cloneElement<RadioButtonProps>(child as ReactElement, {
      onChange() {
        handleRadioButtonClick(child.props)
      },
      checked: value === child.props.value,
    })
  })

  return (
    <div className={clsx('flex flex-col gap-3', className)} {...props}>
      {children}
    </div>
  )
}

export default RadioButtonGroup
