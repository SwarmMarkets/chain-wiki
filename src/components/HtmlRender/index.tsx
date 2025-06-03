import clsx from 'clsx'
import { forwardRef, useEffect } from 'react'
import styled from 'styled-components'

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

export const HtmlRenderHover = styled(HtmlRender)`
  & > * {
    &:hover {
      border-radius: 4px;
      background: ${({ theme }) => theme.palette.nearWhite};
      box-shadow: 0 0 0 8px ${({ theme }) => theme.palette.nearWhite};
    }
  }
`
