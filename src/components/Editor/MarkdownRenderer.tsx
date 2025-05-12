import React, { forwardRef, useMemo } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'
import { visit } from 'unist-util-visit'
import prod from 'react/jsx-runtime'
import md5 from 'md5'
import Icon from '../ui-kit/Icon/Icon'
import IconButton from '../ui-kit/IconButton'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

interface MarkdownRendererProps {
  fullTokenId?: string
  markdown: string
  showComments?: boolean
  onClickComment?: (sectionId: string) => void
}

const MarkdownRenderer = forwardRef<HTMLDivElement, MarkdownRendererProps>(
  ({ markdown, showComments, onClickComment, fullTokenId }, ref) => {
    const Content = useMemo(() => {
      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkGfm)
        .use(() => tree => {
          visit(tree, (node: any) => {
            if (!fullTokenId || !showComments) return
            if (
              node.type === 'paragraph' ||
              node.type === 'heading' ||
              node.type === 'listItem'
            ) {
              const textContent = node.children
                ?.filter(
                  (child: any) =>
                    child.type === 'text' ||
                    child.type === 'paragraph' ||
                    child.type === 'strong' ||
                    child.type === 'emphasis'
                )
                ?.map((child: any) => {
                  if (child.type === 'text') return child.value
                  if (child.children) {
                    return child.children
                      .filter((sub: any) => sub.type === 'text')
                      .map((sub: any) => sub.value)
                      .join(' ')
                  }
                  return ''
                })
                .join(' ')

              if (textContent) {
                const id = `${fullTokenId}-${node.type}-${md5(textContent)}`
                node.data = node.data || {}
                node.data.hProperties = {
                  ...(node.data.hProperties || {}),
                  id,
                }
              }
            }
          })
        })
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeHighlight)
        .use(rehypeReact, {
          Fragment: prod.Fragment,
          jsx: prod.jsx,
          jsxs: prod.jsxs,
          components: {
            a: (props: any) => (
              <a {...props} target='_blank' rel='noopener noreferrer'>
                {props.children}
              </a>
            ),
            ...(showComments && {
              p: (props: any) => (
                <ParagraphWithComment
                  onClickComment={onClickComment}
                  {...props}
                  tag='p'
                />
              ),
              h1: (props: any) => (
                <ParagraphWithComment
                  onClickComment={onClickComment}
                  {...props}
                  tag='h1'
                />
              ),
              h2: (props: any) => (
                <ParagraphWithComment
                  onClickComment={onClickComment}
                  {...props}
                  tag='h2'
                />
              ),
              h3: (props: any) => (
                <ParagraphWithComment
                  onClickComment={onClickComment}
                  {...props}
                  tag='h3'
                />
              ),
              li: (props: any) => (
                <ParagraphWithComment
                  onClickComment={onClickComment}
                  {...props}
                  tag='li'
                />
              ),
            }),
          },
        })

      const file = processor.processSync(markdown)
      return file.result
    }, [fullTokenId, markdown, onClickComment, showComments])

    return (
      <div className='prose max-w-none' ref={ref}>
        {Content}
      </div>
    )
  }
)

interface ParagraphWithCommentProps extends React.HTMLAttributes<HTMLElement> {
  tag: keyof JSX.IntrinsicElements
  onClickComment?: (sectionId: string) => void
}

const ParagraphWithComment: React.FC<ParagraphWithCommentProps> = ({
  children,
  id,
  tag,
  onClickComment,
}) => {
  const Tag = tag
  return (
    <Tag id={id} className='group relative'>
      {children}
      {id && (
        <IconButton
          className='ml-2 opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 top-0'
          onClick={() => onClickComment?.(id)}
        >
          <Icon name='comment' size={16} />
        </IconButton>
      )}
    </Tag>
  )
}

export default MarkdownRenderer
