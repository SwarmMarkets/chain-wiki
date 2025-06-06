import { forwardRef, useEffect, useRef } from 'react'
import { HtmlRenderHover, HtmlRenderProps } from '.'
import { SelectedSection } from '../Token/TokenView/TokenView'
import { createCommentIconElement } from './utils'
import React from 'react'

interface AttestationHtmlRenderProps extends HtmlRenderProps {
  onSelectSection: (section: SelectedSection) => void
}

const AttestationHtmlRender = forwardRef<
  HTMLDivElement,
  AttestationHtmlRenderProps
>(({ onSelectSection, ...props }, ref) => {
  const htmlWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const children = htmlWrapperRef.current?.children
    if (!children) return
    const childrenArray = Array.from(children)

    const handleChildEnter = (event: Event) => {
      const currentTarget = event.currentTarget as HTMLElement
      const commentIconElem = currentTarget.lastElementChild as HTMLElement
      commentIconElem.style.display = 'block'
    }

    const handleChildLeave = (event: Event) => {
      const currentTarget = event.currentTarget as HTMLElement
      const commentIconElem = currentTarget.lastElementChild as HTMLElement
      commentIconElem.style.display = 'none'
    }

    const handleChildClick = (_: Event, element: HTMLElement) => {
      const elementCopy = element.cloneNode(true) as HTMLElement
      elementCopy.lastChild?.remove()
      onSelectSection({
        id: elementCopy.getAttribute('id'),
        htmlContent: elementCopy.outerHTML,
      })
    }

    childrenArray.forEach(async child => {
      const childElem = child as HTMLElement
      childElem.addEventListener('mouseenter', handleChildEnter)
      childElem.addEventListener('mouseleave', handleChildLeave)
      childElem.style.position = 'relative'
      const childElemId = childElem.getAttribute('id')
      if (!childElemId) {
        return
      }
      const commentIconElem = await createCommentIconElement(childElemId)

      commentIconElem?.addEventListener('click', e =>
        handleChildClick(e, childElem)
      )

      child.appendChild(commentIconElem)
    })
  }, [onSelectSection])

  return (
    <div ref={ref}>
      <HtmlRenderHover ref={htmlWrapperRef} {...props} />
    </div>
  )
})

export default React.memo(AttestationHtmlRender)
