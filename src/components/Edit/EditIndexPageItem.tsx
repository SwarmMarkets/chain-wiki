import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useToggle from 'src/hooks/useToggle'
import Icon from '../ui-kit/Icon/Icon'
import TextField from '../ui/TextField/TextField'
import clsx from 'clsx'
import IconButton from '../ui-kit/IconButton'

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
}) => {
  const { toggle, isOn } = useToggle(false)
  const textFieldRef = useRef(null)

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

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit?.(e.target.value)
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
    <Link
      to={to || ''}
      className={clsx(
        'flex items-center justify-between w-full box-border rounded transition-colors overflow-hidden px-2 py-1.5',
        active && 'bg-gray-100 text-main-accent',
        hasChild && 'mb-1',
        isGroup
          ? 'typo-title2 pointer-events-none'
          : 'hover:bg-gray-100 cursor-pointer'
      )}
      onClick={handleClick}
    >
      {isOn ? (
        <TextField
          inputProps={{ onBlur: handleBlurName }}
          ref={textFieldRef}
          value={name}
          onChange={handleChangeName}
          maxWidth='160px'
        />
      ) : (
        name
      )}
      <div className='flex items-center gap-2'>
        {!readonly && editable && (
          <Icon
            onClick={handleActionIconClick}
            name={isOn ? 'checkmark' : 'edit'}
          />
        )}
        {hasChild && (!isGroup || !readonly) && (
          <IconButton hoverBackground='gray-200'>
            <Icon
              onClick={handleToggle}
              name='chevronRight'
              size={12}
              className={clsx(
                'transition-transform',
                isOpen ? 'rotate-90' : 'rotate-0'
              )}
            />
          </IconButton>
        )}
      </div>
    </Link>
  )
}

export default EditIndexPagesItem
