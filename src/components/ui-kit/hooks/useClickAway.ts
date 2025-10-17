"use client"

import { useEffect, useRef, useState } from 'react'

export default function useClickAway(callback?: (e: MouseEvent) => void) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggle = () => {
    setActive(prev => !prev)
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setActive(false)
        callback?.(e)
      }
    }
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [active, callback])

  return { ref, active, setActive, toggle }
}
