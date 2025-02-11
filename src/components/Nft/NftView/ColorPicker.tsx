import TextField from 'src/components/ui/TextField/TextField'
import React, { useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { ColorInputWrapper, ColorBox, PickerWrapper } from './styled-components'
import useClickOutside from 'src/hooks/useClickOutside'

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
  useClickOutside(pickerRef, () => setShowColorPicker(false))

  const handleColorChange = (newColor: string) => {
    onColorChange(newColor)
  }

  return (
    <ColorInputWrapper alignItems={'center'}>
      <TextField
        width={85}
        value={color}
        inputProps={{
          onChange: e => handleColorChange(e.currentTarget.value),
        }}
      />
      <ColorBox
        color={color}
        onClick={toggleColorPicker}
        marginLeft={10}
        width={24}
        height={24}
        justifyContent={'center'}
      />
      {showColorPicker && (
        <PickerWrapper ref={pickerRef} marginLeft={95}>
          <HexColorPicker color={color} onChange={handleColorChange} />
        </PickerWrapper>
      )}
    </ColorInputWrapper>
  )
}

export default ColorPicker
