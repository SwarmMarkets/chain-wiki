import { useEffect, useRef } from 'react'

const useOnFirstMount = (onFirstRender: () => void) => {
  const hasRendered = useRef(false)

  useEffect(() => {
    if (!hasRendered.current) {
      hasRendered.current = true
      onFirstRender()
    }
  }, [onFirstRender])
}

export default useOnFirstMount
