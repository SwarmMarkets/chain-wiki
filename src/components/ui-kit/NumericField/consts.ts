import { displayNumericString, formatToNumericString } from './formatters'
import { FieldTypeConfig, NumericFieldTypes } from './types'
import { big } from 'src/common/utils/big-utils'

export const fieldTypes: {
  [k in NumericFieldTypes]: FieldTypeConfig<k>
} = {
  number: {
    format: (v, options) => formatToNumericString(v, options), // Clean invalid characters
    transform: v => Number(v), // Convert to number
    display: (v, options) => displayNumericString(v, options), // Format for display
  },
  big: {
    format: (v, options) => formatToNumericString(v, options), // Handle decimals and cleaning
    transform: v => big(v), // Convert to Big.js
    display: (v, options) => displayNumericString(v, options), // Format for display
  },
}
