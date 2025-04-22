import Big from 'big.js'
import { big } from 'src/common/utils/big-utils'
import { DisplayOptions, FormatOptions } from './types'
import { isNil } from 'lodash'

export function displayNumericString(
  input?: string | Big | number | null,
  options?: DisplayOptions
): string {
  let value = input

  if (value instanceof Big) {
    value = value.toFixed()
  } else if (typeof value === 'number') {
    value = value.toString()
  } else if (isNil(value)) {
    return '0'
  }

  let cleanedValue = value.replace(/[^0-9.,]/g, '').replace(/,/g, '')

  // Prevent multiple decimal points
  const decimalCount = (cleanedValue.match(/\./g) || []).length
  if (decimalCount > 1) {
    cleanedValue = cleanedValue.replace(/\.(?=.*\.)/g, '') // Remove all but the first decimal point
  }

  // Prevent display decimal point if it's 0
  if (options?.decimals === 0) {
    cleanedValue = cleanedValue.replace(/[.]/g, '')
  }

  if (options?.min && big(cleanedValue).lt(options.min)) {
    cleanedValue = new Big(options.min).toFixed()
  }
  if (options?.max && big(cleanedValue).gt(options.max)) {
    cleanedValue = new Big(options.max).toFixed()
  }

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = cleanedValue.split('.')

  // Format the integer part with commas
  const formattedInteger = integerPart
    .replace(/^0+(?!\.|$)/, '') // Remove leading zeros unless immediately before a decimal point
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Limit decimal places based on options
  const truncatedDecimal =
    options?.decimals !== undefined && decimalPart
      ? decimalPart.slice(0, options.decimals)
      : decimalPart

  // Return the formatted number with decimal part (if exists)
  return truncatedDecimal !== undefined
    ? `${formattedInteger}.${truncatedDecimal}`
    : formattedInteger
}

export function formatToNumericString(
  value: string,
  options?: FormatOptions
): string {
  // Return "0" if the input is empty or contains only whitespace
  if (!value || value.trim() === '') {
    return '0'
  }

  // Remove all invalid characters, allowing only digits, ".", and ","
  let cleanedValue = value.replace(/[^0-9.]/g, '').trim()

  // Handle cases like ".1" -> "0.1" and ".0" -> "0"
  if (cleanedValue.startsWith('.')) {
    cleanedValue = '0' + cleanedValue
  }

  // Convert to Big.js to handle numerical formatting and validation
  let bigValue = big(cleanedValue)

  // Enforce min and max constraints if provided
  if (options?.min && bigValue.lt(options.min)) {
    bigValue = big(options.min)
  }
  if (options?.max && bigValue.gt(options.max)) {
    bigValue = big(options.max)
  }

  // Limit the number of decimal places if specified
  if (options?.decimals) {
    bigValue = big(bigValue.toFixed(options.decimals))
  }

  // Convert Big.js to string, removing unnecessary trailing zeros
  const formattedValue = bigValue.toFixed()

  return formattedValue
}
