import { forwardRef, useEffect, useRef } from 'react'
import { HtmlWrapper } from './styled-components'
import CommentIcon from '@src/assets/icons/comment.svg'

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
      const children = htmlWrapperRef.current?.children
      if (!children) return
      const childrenArray = Array.from(children)
      const addActions = (elem: HTMLElement) => {
        const lastElem = elem.lastElementChild as HTMLElement
        lastElem.style.display = 'block'
      }

      const removeActions = (elem: HTMLElement) => {
        const lastElem = elem.lastElementChild as HTMLElement
        lastElem.style.display = 'none'
      }

      const handleChildEnter = (event: Event) => {
        addActions(event.currentTarget as HTMLElement)
      }

      const handleChildLeave = (event: Event) => {
        removeActions(event.currentTarget as HTMLElement)
      }

      const handleChildClick = (event: Event, element: HTMLElement) => {
        const elementCopy = element.cloneNode(true) as HTMLElement
        elementCopy.lastChild?.remove()
        onSelectSection && onSelectSection(elementCopy.outerHTML)
      }

      childrenArray.forEach(child => {
        const childElem = child as HTMLElement
        childElem.addEventListener('mouseenter', handleChildEnter)
        childElem.addEventListener('mouseleave', handleChildLeave)
        const svgElement = document.createElement('object')
        svgElement.setAttribute('type', 'image/svg+xml')
        svgElement.setAttribute('data', CommentIcon)

        childElem.style.position = 'relative'
        svgElement.style.display = 'none'
        svgElement.style.position = 'absolute'
        svgElement.style.top = '0'
        svgElement.style.right = '0'
        svgElement.addEventListener('load', function () {
          svgElement?.contentDocument?.addEventListener('click', e =>
            handleChildClick(e, childElem)
          )
        })
        child.appendChild(svgElement)
      })
    }, [])

    return (
      <div ref={ref}>
        <HtmlWrapper
          ref={htmlWrapperRef}
          commentable={!!onSelectSection}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    )
  }
)

export default HtmlRender
