'use client'

import React from 'react'
import useToggle from 'src/hooks/useToggle'
import Icon from '../ui-kit/Icon/Icon'
import clsx from 'clsx'
import IconButton from '../ui-kit/IconButton'
import DynamicComponent from '../DynamicComponent'
import EditIndexPageModal from './EditIndexPageModal'
import Link from 'next/link'

interface EditIndexPagesItemProps {
  to?: string
  name: string
  slug: string
  active?: boolean
  editable?: boolean
  hasChild?: boolean
  isOpen?: boolean
  isGroup?: boolean
  readonly?: boolean
  onClick?: () => void
  onEdit?: (data: { name: string; slug: string }) => void
  onToggle?: (e: React.MouseEvent) => void
  className?: string
  depth?: number
  parent?: any
  isFirstGroup?: boolean
}

const EditIndexPagesItem: React.FC<EditIndexPagesItemProps> = ({
  to,
  name,
  slug,
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
  depth,
  parent,
  isFirstGroup,
}) => {
  const { toggle: toggleModal, isOn: isModalOpen } = useToggle(false)

  const handleClick = () => {
    if (!isModalOpen) {
      onClick?.()
    }
  }

  const handleEdit = (data: { name: string; slug: string }) => {
    onEdit?.(data)
  }

  const handleActionIconClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    toggleModal()
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onToggle?.(e)
  }

  return (
    <>
      <DynamicComponent
        as={to ? Link : 'div'}
        {...(!to ? {} : { href: to })}
        className={clsx(
          'flex items-center justify-between w-full box-border rounded transition-colors overflow-hidden px-1.5 py-1 gap-2 group',
          active && 'bg-gray-100 text-main-accent',
          hasChild && 'mb-1',
          isGroup
            ? [
                'uppercase font-semibold text-main-accent typo-body1',
                !isFirstGroup && 'mt-6',
              ]
            : 'hover:bg-gray-100 cursor-pointer',
          !isGroup &&
            depth &&
            depth > 0 &&
            parent?.data?.type !== 'group' && [
              active
                ? 'border-l-2 border-primary'
                : 'border-l-2 border-gray-200',
              'rounded-tl-none rounded-bl-none',
              'transition-all duration-200',
            ],
          className
        )}
        onClick={handleClick}
      >
        <div className='flex-1 break-words min-w-0'>
          <span className='block leading-snug break-words'>{name}</span>
        </div>

        <div className='flex items-center gap-2 flex-shrink-0'>
          {!readonly && editable && (
            <IconButton
              hoverBackground='gray-200'
              onClick={handleActionIconClick}
              className='opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <Icon size={16} name='edit' />
            </IconButton>
          )}
          {hasChild && (
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

      <EditIndexPageModal
        open={isModalOpen}
        onClose={toggleModal}
        name={name}
        slug={slug}
        onSave={handleEdit}
      />
    </>
  )
}

export default EditIndexPagesItem
