import clsx from 'clsx'
import React, { ReactElement, ReactNode } from 'react'
import useClickAway from '../hooks/useClickAway'
import Option, { OptionProps, ValueType } from './Option'
import './styles.css'
import Icon from '../Icon/Icon'
import { motion } from 'framer-motion'

type SelectVariants = 'filled' | 'standard'

interface SingleSelectProps<T> {
  multiselect?: false
  value: T
  onChange: (value: T) => void
}

interface MultiSelectProps<T> {
  multiselect: true
  value: T[]
  onChange: (value: T[]) => void
}

type SelectProps<T> = (SingleSelectProps<T> | MultiSelectProps<T>) & {
  children: ReactNode
  variant?: SelectVariants
  placeholder?: string
  renderedValue?: ReactNode
  className?: string
  optionsClass?: string
  disabled?: boolean
  position?: 'top' | 'bottom'
}

const Select = <T extends ValueType = ValueType>({
  variant = 'standard',
  value,
  placeholder = 'Select an option',
  renderedValue,
  multiselect,
  onChange,
  optionsClass,
  className,
  disabled,
  children,
  position,
}: SelectProps<T>) => {
  const { ref, active, setActive, toggle } = useClickAway()

  const handleOptionClick = (optionValue: T) => {
    if (disabled) return

    if (!multiselect) {
      onChange(optionValue)
      setActive(false)
    }

    if (multiselect && Array.isArray(value)) {
      const index = value.indexOf(optionValue)
      const newValues = [...value]
      if (index > -1) {
        newValues.splice(index, 1) // Deselect if already selected
      } else {
        newValues.push(optionValue) // Select if not selected
      }
      onChange(newValues)
    }
  }

  const childrenElements = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return null
    }
    if (child.type === Option) {
      return React.cloneElement<OptionProps>(
        child as ReactElement<OptionProps>,
        {
          onClick: () => handleOptionClick(child.props.value),
          selected: child.props.value === value,
          ...child.props,
        }
      )
    }

    return child
  })

  const selectedOption = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return null
    }

    const isOptionChild = (child as ReactElement).type === Option

    if (isOptionChild && child.props.value === value) {
      return React.cloneElement(child as ReactElement<OptionProps>, {
        selected: false,
      })
    }

    return null
  })

  const viewValue =
    renderedValue || (selectedOption?.length && selectedOption) || placeholder

  const variantClasses = {
    standard: 'ui-select-button--standard',
    filled: 'ui-select-button--filled',
  }

  const selectButtonClasses = clsx(
    'ui-select-button',
    variantClasses[variant],
    { 'cursor-auto opacity-50 pointer-events-none': disabled }
  )

  return (
    <div className={clsx('ui-select', className)} ref={ref}>
      <button className={selectButtonClasses} onClick={toggle}>
        <span className='ui-select-value'>{viewValue}</span>
        <span className={clsx('ui-select-dropdown', { 'rotate-180': active })}>
          <Icon name='arrow-down' />
        </span>
      </button>

      {active && (
        <motion.ul
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className={clsx(
            'ui-options-list max-h-96 z-10 min-w-min',
            position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1',
            optionsClass
          )}
        >
          {childrenElements}
        </motion.ul>
      )}
    </div>
  )
}

export default Select
