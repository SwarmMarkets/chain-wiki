import React from 'react'
import { LayoutProps, SpaceProps } from 'styled-system'
import { Select } from '.'

interface MySelectProps extends SpaceProps, LayoutProps {
  options: string[]
  value?: number
  onChange?: (value: number) => void
}

const MySelect: React.FC<MySelectProps> = ({
  options,
  value,
  onChange,
  ...props
}) => {
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value)
    onChange && onChange(index)
  }

  return (
    <Select onChange={onChangeSelect} value={value} {...props}>
      {options.map((option, index) => (
        <option key={index} value={index}>
          {option}
        </option>
      ))}
    </Select>
  )
}

export default MySelect
