import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { getUniqueId, IpfsIndexPage, joinTokenId } from 'src/shared/utils'

interface IndexPageWithContent extends IpfsIndexPage {
  content?: string
}

export function parseSummaryToFlatTree(
  markdown: string,
  nftId: string,
  startFromTokenId: number,
  files: Record<string, string>
): IndexPageWithContent[] {
  let nextTokenId = startFromTokenId

  const ast = unified().use(remarkParse).parse(markdown)
  const result: IndexPageWithContent[] = []

  const seen = new Set<string>()
  let currentGroupId: string | number | null = null

  const normalizePathToTokenId = (path: string): string =>
    path.replace(/\.md$/, '').replace(/\/README$/i, '')

  // Проходим по всем top-level нодам AST
  for (const node of ast.children) {
    // Заголовки как группы (кроме "Table of contents")
    if (node.type === 'heading') {
      const text = node.children?.find((c: any) => c.type === 'text')?.value
      if (text && text.trim().toLowerCase() !== 'table of contents') {
        const slug = text.trim().toLowerCase().replace(/\s+/g, '-')
        const tokenId = getUniqueId()

        result.push({
          tokenId,
          slug,
          title: text.trim(),
          parent: 0,
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

    // Один раз обрабатываем список, начиная с верхнего уровня
    if (node.type === 'list') {
      walkList(node.children, currentGroupId ?? 0)
    }
  }

  function walkList(items: any[], parent: string | number) {
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

        const tokenId = joinTokenId(nftId, nextTokenId)
        if (seen.has(tokenId)) continue
        seen.add(tokenId)

        const slug = normalizePathToTokenId(url).split('/').pop()
        if (!slug) continue

        result.push({
          tokenId,
          slug,
          title,
          parent,
          droppable: false,
          content: files[url],
        })

        nextTokenId++

        // Обрабатываем вложенный список, если он есть
        const nextList = item.children?.find((n: any) => n.type === 'list')
        if (nextList) {
          walkList(nextList.children, tokenId)
        }
      }
    }
  }

  return result
}
