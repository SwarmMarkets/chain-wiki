import React, { useEffect, useRef } from 'react'
import { StyledLink } from 'src/components/IndexPages/styled-components'
import useToggle from 'src/hooks/useToggle'
import styled, { useTheme } from 'styled-components'
import Icon from '../ui/Icon'
import TextField from '../ui/TextField/TextField'

interface EditIndexPagesItemProps {
  name: string
  active?: boolean
  onClick?: () => void
  onEdit?: (value: string) => void
}

const ActionIcon = styled(Icon)`
  &:hover {
    color: ${({ theme }) => theme.palette.linkPrimaryAccent} !important;
  }

  opacity: 0;
  transition: 0.2s;
`

const StyledEditLink = styled(StyledLink)`
  &:hover .edit-icon {
    opacity: 1;
    visibility: visible;
  }
`

const EditIndexPagesItem: React.FC<EditIndexPagesItemProps> = ({
  name,
  active = false,
  onClick,
  onEdit,
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

  return (
    <StyledEditLink to='' $isActive={active} onClick={handleClick}>
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
      <ActionIcon
        onClick={handleActionIconClick}
        className='edit-icon'
        cursor='pointer'
        name={isOn ? 'checkmark' : 'edit'}
        color={active ? theme.palette.linkPrimary : theme.palette.black}
      />
    </StyledEditLink>
  )
}

export default EditIndexPagesItem
