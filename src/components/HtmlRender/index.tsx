import { forwardRef, useEffect } from 'react'
import { HtmlWrapper } from './styled-components'

export interface HtmlRenderProps {
  html: string
  onMount?: () => void
}

const HtmlRender = forwardRef<HTMLDivElement, HtmlRenderProps>(
  ({ html, onMount, ...props }, ref) => {
    useEffect(() => {
      onMount && onMount()
    }, [onMount])

    return (
      <HtmlWrapper
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
        {...props}
      />
    )
  }
)

export default HtmlRender
