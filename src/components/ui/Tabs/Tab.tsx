import { useTabContext } from '@src/hooks/useTabContext'
import React from 'react'
import styled from 'styled-components'

export interface TabProps {
  value: string
  label: string
  onChange?: (value: string) => void
}

interface StyledTabProps {
  $active: boolean
}

const StyledTab = styled.div<StyledTabProps>`
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: ${props =>
    props.$active ? `2px solid ${props.theme.palette.borderBlue}` : 'none'};
  color: ${props =>
    props.$active
      ? props.theme.palette.borderBlue
      : props.theme.palette.textPrimary};
`

const Tab: React.FC<TabProps> = ({ value, label, onChange }) => {
  const activeValue = useTabContext()

  if (activeValue === null) {
    throw new TypeError('No TabContext provided')
  }

  return (
    <StyledTab
      onClick={() => onChange && onChange(value)}
      $active={activeValue === value}
    >
      {label}
    </StyledTab>
  )
}

export default Tab
