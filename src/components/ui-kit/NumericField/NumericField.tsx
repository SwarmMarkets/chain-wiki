import { useEffect, useMemo, useState } from 'react'
import useEffectCompare from 'src/common/hooks/helpers/useEffectCompare'
import { big } from 'src/common/utils/big-utils'
import TextField from '../TextField/TextField'
import { fieldTypes } from './consts'
import { DisplayOptions, NumericFieldProps, NumericFieldTypes } from './types'
import { isNil } from 'lodash'

const NumericField = <T extends NumericFieldTypes>({
  type = 'number' as T,
  mode = 'float',
  onChange,
  maxDecimals = 6,
  value,
  displayValue,
  minValue,
  maxValue,
  ...props
}: NumericFieldProps<T>) => {
  const { format, transform, display } = fieldTypes[type]

  // State to manage the raw user input
  const [localValue, setLocalValue] = useState<string>(
    display?.(value) || value?.toString() || ''
  )

  const displayOptions = useMemo<DisplayOptions>(
    () => ({
      decimals: mode === 'float' ? maxDecimals : 0,
      min: minValue,
      max: maxValue,
    }),
    [maxDecimals, maxValue, minValue, mode]
  )

  // Sync localValue with value from props only if they differ
  useEffect(() => {
    const formattedLocalValue = format(localValue, displayOptions)
    const _value = big(value)
    if (!_value.eq(formattedLocalValue)) {
      const displayValue = display(value.toFixed(), displayOptions)
      setLocalValue(displayValue)
    }
  }, [value, localValue, transform, display, format, displayOptions])

  // Once displayOptions has changed, automatically update the value in the textField
  useEffectCompare(() => {
    const _value = big(value)

    const displayValue = display(_value.toFixed(), displayOptions)
    const formattedValue = format(_value.toFixed(), displayOptions)
    const transformedValue = transform(formattedValue)

    setLocalValue(displayValue)
    onChange?.(transformedValue)
  }, [displayOptions])

  const handleChange = (input: string) => {
    const formattedValue = format(input, displayOptions)
    const displayValue = display(input, displayOptions)
    setLocalValue(displayValue)
    onChange?.(transform(formattedValue))
  }

  const handleBlur = () => {
    const formattedValue = format(localValue, displayOptions)
    const displayValue = display(formattedValue, displayOptions)
    setLocalValue(displayValue)
    onChange?.(transform(formattedValue))
  }

  return (
    <TextField
      type='text'
      value={isNil(displayValue) ? localValue : displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  )
}

export default NumericField
