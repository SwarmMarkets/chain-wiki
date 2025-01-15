import React, { useEffect, useRef } from 'react'
import { StyledLink } from 'src/components/IndexPages/styled-components'
import useToggle from 'src/hooks/useToggle'
import styled, { useTheme } from 'styled-components'
import Icon from '../ui/Icon'
import TextField from '../ui/TextField/TextField'
import Flex from '../ui/Flex'
import Box from '../ui/Box'

interface EditIndexPagesItemProps {
  to?: string
  name: string
  active?: boolean
  hasChild?: boolean
  isOpen?: boolean
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

export const StyledEditLink = styled(StyledLink)<{
  $isActive: boolean
}>`
  &:hover .edit-icon {
    opacity: 1;
    visibility: visible;
  }
`

const EditIndexPagesItem: React.FC<EditIndexPagesItemProps> = ({
  to,
  name,
  active = false,
  hasChild = false,
  isOpen = false,
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
    <StyledEditLink to={to || ''} $isActive={active} onClick={handleClick}>
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
        {!readonly && (
          <ActionIcon
            onClick={handleActionIconClick}
            className='edit-icon'
            cursor='pointer'
            name={isOn ? 'checkmark' : 'edit'}
            color={active ? theme.palette.linkPrimary : theme.palette.black}
          />
        )}
        {hasChild && (
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
