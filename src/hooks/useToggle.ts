import { useState } from 'react'

const useToggle = (initialValue: boolean) => {
  const [isOn, setIsOn] = useState(initialValue)

  return {
    off: () => setIsOn(false),
    on: () => setIsOn(true),
    toggle: () => setIsOn(!isOn),
    isOn,
  }
}

export default useToggle
