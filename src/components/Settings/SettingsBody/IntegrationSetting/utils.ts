import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'

type IpfsIndexPage = {
  tokenId: string
  title: string
  parent: string | number
  droppable?: boolean
  type?: 'group' | 'page'
}

export function parseSummaryToFlatTree(markdown: string): IpfsIndexPage[] {
  const ast = unified().use(remarkParse).parse(markdown)
  const result: IpfsIndexPage[] = []

  const parentStack: string[] = ['0'] // начальный родитель
  let currentGroupId: string | null = null
  const seen = new Set<string>()

  const normalizePathToTokenId = (path: string): string => {
    return path.replace(/\.md$/, '').replace(/\/README$/i, '')
  }

  visit(ast, node => {
    // Заголовки как группы (кроме "Table of contents")
    if (node.type === 'heading') {
      const text = node.children?.find((c: any) => c.type === 'text')?.value
      if (text && text.trim().toLowerCase() !== 'table of contents') {
        const slug = text.trim().toLowerCase().replace(/\s+/g, '-')
        const tokenId = slug

        result.push({
          tokenId,
          title: text.trim(),
          parent: '0',
          droppable: true,
          type: 'group',
        })

        currentGroupId = tokenId
      }
    }

    // *** — сброс текущей группы
    if (node.type === 'thematicBreak') {
      currentGroupId = null
    }

    // Обработка списков
    if (node.type === 'list') {
      const walkList = (items: any[], parent: string | number) => {
        for (const item of items) {
          const linkNode = item.children?.[0]?.children?.find(
            (n: any) => n.type === 'link'
          )
          if (linkNode) {
            const title = linkNode.children
              ?.find((n: any) => n.type === 'text')
              ?.value?.trim()
            const url = linkNode.url
            if (!title || !url) continue

            const tokenId = normalizePathToTokenId(url)
            if (seen.has(tokenId)) continue
            seen.add(tokenId)

            result.push({
              tokenId,
              title,
              parent,
              droppable: false,
              type: 'page',
            })

            // Вложенные элементы становятся дочерними ТОЛЬКО текущего элемента
            const nextList = item.children?.find((n: any) => n.type === 'list')
            if (nextList) {
              walkList(nextList.children, tokenId)
            }
          }
        }
      }

      walkList(node.children, currentGroupId ?? '0')
    }
  })

  return result
}
