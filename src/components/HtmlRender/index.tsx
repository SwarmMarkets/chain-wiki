'use client'

import clsx from 'clsx'
import { forwardRef, useEffect } from 'react'

export interface HtmlRenderProps extends React.HTMLAttributes<HTMLDivElement> {
  html: string
  onMount?: () => void
}

const HtmlRender = forwardRef<HTMLDivElement, HtmlRenderProps>(
  ({ html, onMount, className, ...props }, ref) => {
    useEffect(() => {
      onMount && onMount()
    }, [onMount])

    return (
      <div
        className={clsx('prose', className)}
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
        {...props}
      />
    )
  }
)

export default HtmlRender
