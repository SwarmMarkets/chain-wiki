import Big from 'big.js'
import { TextFieldProps } from '../TextField/types'

export type DisplayOptions = {
  decimals?: number
  min?: number | Big
  max?: number | Big
}
export type FormatOptions = {
  decimals?: number
  min?: number | Big
  max?: number | Big
}

export type FieldTypeConfig<T extends NumericFieldTypes> = {
  format: (v: string, options?: FormatOptions) => string
  transform: (v: string) => NumericFieldValue<T>
  display: (
    v: NumericFieldValue<T> | string,
    options?: DisplayOptions
  ) => string
}

export type NumericFieldTypes = 'number' | 'big'
export type NumericFieldMode = 'integer' | 'float'
export type NumericFieldValue<T extends NumericFieldTypes> = T extends 'big'
  ? Big
  : T extends 'number'
  ? number
  : unknown

export interface NumericFieldProps<T extends NumericFieldTypes>
  extends Omit<TextFieldProps, 'type' | 'value' | 'onChange'> {
  value: NumericFieldValue<T>
  type?: T
  onChange?: (value: NumericFieldValue<T>) => void
  mode?: NumericFieldMode
  maxDecimals?: number // Maximum decimal places allowed for float mode
  minValue?: number | Big
  maxValue?: number | Big
  displayValue?: string | null
}
