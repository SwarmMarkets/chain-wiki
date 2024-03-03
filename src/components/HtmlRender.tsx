import shouldForwardProp from '@styled-system/should-forward-prop'
import { forwardRef, useEffect, useRef } from 'react'
import styled from 'styled-components'

interface HtmlRenderProps {
  html: string
  onMount?: () => void
  onSelectSection?: (html: string) => void
}

interface HtmlWrapperProps {
  commentable?: boolean
}

const HtmlWrapper = styled.div.withConfig({
  shouldForwardProp,
})<HtmlWrapperProps>`
  line-height: 1.4;
  color: ${({ theme }) => theme.palette.textPrimary};

  ${props =>
    props.commentable &&
    ` 
      & > * {
        &:hover {
          border-radius: 4px;
          background: ${props.theme.palette.nearWhite};
          box-shadow: 0 0 0 8px ${props.theme.palette.nearWhite};
        }
      }
    `};

  /* Styles for paragraphs and headings */
  p {
    margin-bottom: 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    margin: 20px 0;
  }

  /* Styles for lists and tables */
  ul,
  ol {
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  /* Styles for links and images */
  a {
    color: ${({ theme }) => theme.palette.linkPrimary};
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Additional styles */
  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }
`

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

      const handleChildClick = (event: Event) => {
        const target = event.currentTarget as HTMLElement
        onSelectSection && onSelectSection(target.outerHTML)
      }

      childrenArray.forEach(child => {
        child.addEventListener('click', handleChildClick)
      })

      return () => {
        childrenArray.forEach(child =>
          child.removeEventListener('click', handleChildClick)
        )
      }
    }, [html, htmlWrapperRef, onSelectSection])

    return (
      <div ref={ref}>
        <HtmlWrapper
          commentable={!!onSelectSection}
          ref={htmlWrapperRef}
          dangerouslySetInnerHTML={{ __html: html }}
        ></HtmlWrapper>
      </div>
    )
  }
)

export default HtmlRender
