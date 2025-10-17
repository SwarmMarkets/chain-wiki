'use client'

import { motion } from 'framer-motion'
import { ComponentProps, forwardRef, useMemo } from 'react'

export interface FadeProps
  extends ComponentProps<ReturnType<typeof motion<undefined, 'div'>>> {
  element?: string
  scale?: number
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(
  ({ element = 'div', scale = 0.7, ...props }, ref) => {
    const Component = useMemo(
      () => motion<undefined, 'div'>(element),
      [element]
    )

    return (
      <Component
        ref={ref}
        initial={{ opacity: 0, scale }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale }}
        {...props}
      />
    )
  }
)

export default Fade
