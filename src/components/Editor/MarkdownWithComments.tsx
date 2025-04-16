import React, { useMemo } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'
import { visit } from 'unist-util-visit'
import prod from 'react/jsx-runtime'
import md5 from 'md5'
import Icon from '../ui-kit/Icon/Icon'
import IconButton from '../ui-kit/IconButton'

interface MarkdownRendererProps {
  markdown: string
  showComments?: boolean
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  showComments,
}) => {
  const Content = useMemo(() => {
    const processor = unified()
      .use(remarkParse)
      .use(() => tree => {
        visit(tree, (node: any) => {
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
              const id = `node-${md5(textContent)}`
              node.data = node.data || {}
              node.data.hProperties = {
                ...(node.data.hProperties || {}),
                id,
              }
            }
          }
        })
      })
      .use(remarkRehype)
      .use(rehypeReact, {
        Fragment: prod.Fragment,
        jsx: prod.jsx,
        jsxs: prod.jsxs,
        ...(showComments && {
          components: {
            p: (props: any) => <ParagraphWithComment {...props} tag='p' />,
            h1: (props: any) => <ParagraphWithComment {...props} tag='h1' />,
            h2: (props: any) => <ParagraphWithComment {...props} tag='h2' />,
            h3: (props: any) => <ParagraphWithComment {...props} tag='h3' />,
            li: (props: any) => <ParagraphWithComment {...props} tag='li' />,
          },
        }),
      })

    const file = processor.processSync(markdown)
    return file.result
  }, [markdown, showComments])

  return <div className='prose max-w-none'>{Content}</div>
}

const ParagraphWithComment: React.FC<
  React.HTMLAttributes<HTMLElement> & { tag: keyof JSX.IntrinsicElements }
> = ({ children, id, tag }) => {
  const Tag = tag
  return (
    <Tag id={id} className='group relative flex items-center'>
      {children}
      {id && (
        <IconButton
          className='ml-2 opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={() => alert(`Открыть комментарии к ${id}`)}
        >
          <Icon name='comment' />
        </IconButton>
      )}
    </Tag>
  )
}

export default MarkdownRenderer
