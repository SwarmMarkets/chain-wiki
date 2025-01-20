import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useToggle from 'src/hooks/useToggle'
import styled, { useTheme } from 'styled-components'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import TextField from '../ui/TextField/TextField'

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

const ActionIcon = styled(Icon)`
  &:hover {
    color: ${({ theme }) => theme.palette.linkPrimaryAccent} !important;
  }

  opacity: 0;
  transition: 0.2s;
`

const ChevronRightIcon = styled(Icon)`
  &:hover {
    color: ${({ theme }) => theme.palette.linkPrimaryAccent} !important;
  }

  transition: all 0.2s;
`

export const StyledEditLink = styled(Link)<{
  $isActive: boolean
  $isGroup: boolean
  $readonly: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  cursor: ${({ $isGroup, $readonly }) =>
    !$isGroup || ($isGroup && !$readonly) ? 'pointer' : 'default'};
  font-size: ${({ theme, $isGroup }) =>
    $isGroup ? theme.fontSizes.mediumPlus : theme.fontSizes.medium};
  color: ${({ theme, $isActive, $isGroup }) =>
    $isActive
      ? theme.palette.linkPrimary
      : $isGroup
      ? theme.palette.darkGray
      : theme.palette.black};
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  overflow: hidden;
  padding: 5px;

  &:hover {
    background-color: ${({ theme, $isActive, $isGroup, $readonly }) =>
      $isGroup && $readonly
        ? 'transparent'
        : $isActive
        ? theme.palette.blueLight
        : theme.palette.lightGray};
  }

  &:hover .edit-icon {
    opacity: 1;
    visibility: visible;
  }
`

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
  const theme = useTheme()
  const { toggle, isOn } = useToggle(false)
  const textFieldRef = useRef<HTMLInputElement | null>(null)

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
    <StyledEditLink
      $isGroup={isGroup}
      $readonly={readonly}
      to={to || ''}
      $isActive={active}
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
      <Flex $gap='5px' alignItems='center'>
        {!readonly && editable && (
          <ActionIcon
            onClick={handleActionIconClick}
            className='edit-icon'
            cursor='pointer'
            name={isOn ? 'checkmark' : 'edit'}
            color={active ? theme.palette.linkPrimary : theme.palette.black}
          />
        )}
        {hasChild && !isGroup && (
          <ChevronRightIcon
            cursor='pointer'
            style={{ transform: isOpen ? 'rotate(90deg)' : '' }}
            name='chevronRight'
            color={theme.palette.textPrimary}
            width={12}
            height={12}
            onClick={handleToggle}
          />
        )}
      </Flex>
    </StyledEditLink>
  )
}

export default EditIndexPagesItem
