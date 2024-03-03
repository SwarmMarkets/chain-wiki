import { forwardRef, useEffect, useRef } from 'react'
import { HtmlWrapper } from './styled-components'

interface HtmlRenderProps {
  html: string
  onMount?: () => void
  onSelectSection?: (html: string) => void
}

const HtmlRender = forwardRef<HTMLDivElement, HtmlRenderProps>(
  ({ html, onMount, onSelectSection }, ref) => {
    useEffect(() => {
      onMount && onMount()
    }, [onMount])

    const htmlWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!onSelectSection) return
      const handleChildClick = (event: MouseEvent) => {
        const currentTarget = event.currentTarget as HTMLElement
        const target = event.target as HTMLElement
        const children = htmlWrapperRef.current?.children
        if (!children || !currentTarget) return

        const childrenArray = Array.from(children)

        childrenArray.forEach(child => {
          console.log(child.contains(target))
          if (child?.contains(target)) {
            onSelectSection && onSelectSection(child.outerHTML)
          }
        })
      }

      htmlWrapperRef.current?.addEventListener('click', handleChildClick)

      return () =>
        htmlWrapperRef.current?.removeEventListener('click', handleChildClick)
    }, [html, htmlWrapperRef, onSelectSection])

    return (
      <div ref={ref}>
        <HtmlWrapper
          commentable={!!onSelectSection}
          ref={htmlWrapperRef}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    )
  }
)

export default HtmlRender
