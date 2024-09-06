import TextField from '@src/components/ui/TextField/TextField'
import React, { useState, useRef, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import styled from 'styled-components'

const ColorInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const ColorBox = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  background-color: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.palette.borderPrimary};
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  /* Center the color box vertically relative to the input field */
  display: flex;
  align-items: center;
  justify-content: center;
`

const PickerWrapper = styled.div`
  position: absolute;
  top: 50px;
  margin-left: 95px;
  margin-bottom: 20px;
  z-index: 100;
`

interface ColorPickerProps {
  color: string
  onColorChange: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const toggleColorPicker = () => {
    setShowColorPicker(prev => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setShowColorPicker(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <ColorInputWrapper>
      <TextField
        width={85}
        value={color}
        inputProps={{ onChange: e => onColorChange(e.currentTarget.value) }}
      />
      <ColorBox color={color} onClick={toggleColorPicker} />
      {showColorPicker && (
        <PickerWrapper ref={pickerRef}>
          <HexColorPicker color={color} onChange={onColorChange} />
        </PickerWrapper>
      )}
    </ColorInputWrapper>
  )
}

export default ColorPicker
