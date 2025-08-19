import { useEffect, useState } from 'react'

/**
 * Returns a debounced version of a value that only updates
 * after the specified delay has passed without further changes.
 */
const useDebouncedValue = <T>(value: T, delayMs = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delayMs)
    return () => clearTimeout(timerId)
  }, [value, delayMs])

  return debouncedValue
}

export default useDebouncedValue


