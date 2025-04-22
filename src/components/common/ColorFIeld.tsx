import { HexColorPicker } from 'react-colorful'
import TextField from '../ui-kit/TextField/TextField'
import useClickAway from '../ui-kit/hooks/useClickAway'
import clsx from 'clsx'

interface ColorFieldProps {
  color: string
  onChange: (color: string) => void
  className?: string
}

const ColorField: React.FC<ColorFieldProps> = ({
  color,
  onChange,
  className,
}) => {
  const colorPicker = useClickAway()

  return (
    <div className={clsx('flex items-center', className)}>
      <TextField value={color} onChange={onChange} className='w-24' />
      <div
        className='w-6 h-6 ml-2 border border-main rounded cursor-pointer relative'
        style={{ backgroundColor: color }}
        onClick={() => colorPicker.toggle()}
      >
        {colorPicker.active && (
          <div
            ref={colorPicker.ref}
            className='absolute bottom-8 left-0 z-10 rounded'
            onClick={e => e.stopPropagation()}
          >
            <HexColorPicker color={color} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  )
}
export default ColorField
