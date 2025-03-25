import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useToggle from 'src/hooks/useToggle'
import Icon from '../ui-kit/Icon/Icon'
import TextField from '../ui-kit/TextField/TextField'
import clsx from 'clsx'
import IconButton from '../ui-kit/IconButton'
import DynamicComponent from '../DynamicComponent'

interface EditIndexPagesItemProps {
  to?: string
  name: string
  active?: boolean
  editable?: boolean
  hasChild?: boolean
  isOpen?: boolean
  isGroup?: boolean
  readonly?: boolean
  onClick?: () => void
  onEdit?: (value: string) => void
  onToggle?: (e: React.MouseEvent) => void
  className?: string
}

const EditIndexPagesItem: React.FC<EditIndexPagesItemProps> = ({
  to,
  name,
  active = false,
  editable = true,
  hasChild = false,
  isOpen = false,
  isGroup = false,
  readonly = false,
  onClick,
  onEdit,
  onToggle,
  className,
}) => {
  const { toggle, isOn } = useToggle(false)
  const textFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOn) {
      textFieldRef.current?.focus()
    }
  }, [isOn])

  const handleClick = () => {
    if (!isOn) {
      onClick?.()
    }
  }

  const handleChangeName = (name: string) => {
    onEdit?.(name)
  }

  const handleBlurName = () => {
    onEdit?.(name)
    toggle()
  }

  const handleActionIconClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    toggle()
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onToggle?.(e)
  }

  return (
    <DynamicComponent
      as={to ? Link : 'div'}
      to={to || ''}
      className={clsx(
        'flex items-center justify-between w-full box-border rounded transition-colors overflow-hidden px-2 py-1.5 gap-2',
        active && 'bg-gray-100 text-main-accent',
        hasChild && 'mb-1',
        isGroup
          ? 'uppercase font-bold text-main-accrent'
          : 'hover:bg-gray-100 cursor-pointer',
        className
      )}
      onClick={handleClick}
    >
      {isOn ? (
        <TextField
          className='max-w-40'
          inputProps={{ onBlur: handleBlurName, ref: textFieldRef }}
          value={name}
          onChange={handleChangeName}
          hideError
        />
      ) : (
        name
      )}
      <div className='flex items-center gap-2'>
        {!readonly && editable && (
          <IconButton
            hoverBackground='gray-200'
            onClick={handleActionIconClick}
          >
            <Icon size={16} name={isOn ? 'checkmark' : 'edit'} />
          </IconButton>
        )}
        {hasChild && (!isGroup || !readonly) && (
          <IconButton hoverBackground='gray-200' onClick={handleToggle}>
            <Icon
              name='arrow-right-secondary'
              size={8}
              className={clsx(
                'transition-transform',
                isOpen ? 'rotate-90' : 'rotate-0'
              )}
            />
          </IconButton>
        )}
      </div>
    </DynamicComponent>
  )
}

export default EditIndexPagesItem
