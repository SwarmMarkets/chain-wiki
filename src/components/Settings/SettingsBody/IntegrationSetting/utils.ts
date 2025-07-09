import { unified } from 'unified'
import remarkParse from 'remark-parse'
import {
  getUniqueId,
  IpfsIndexPage,
  joinTokenId,
  TokensQueryFullData,
} from 'src/shared/utils'

interface IndexPageWithContent extends IpfsIndexPage {
  content?: string
}

export function parseSummaryToFlatTree(
  markdown: string,
  nftId: string,
  existingTokens: TokensQueryFullData[],
  files: Record<string, string>
): IndexPageWithContent[] {
  let nextTokenIdToMint = existingTokens.length + 1

  const ast = unified().use(remarkParse).parse(markdown)
  const result: IndexPageWithContent[] = []

  const seen = new Set<string>()
  let currentGroupId: string | number | null = null

  const normalizePathToTokenId = (path: string): string =>
    path.replace(/\.md$/, '').replace(/\/README$/i, '')

  // Traverse all top-level AST nodes
  for (const node of ast.children) {
    // Headings as groups (except "Table of contents")
    if (node.type === 'heading') {
      const textNode = node.children?.find((c: any) => c.type === 'text') as
        | { value?: string }
        | undefined
      const text = textNode?.value
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

    // *** — reset current group
    if (node.type === 'thematicBreak') {
      currentGroupId = null
    }

    // Process the list once, starting from the top level
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

        const slug = normalizePathToTokenId(url).split('/').pop()
        if (!slug) continue

        const existingToken = existingTokens.find(t => t.slug === slug)

        const tokenId = existingToken
          ? existingToken.id
          : joinTokenId(nftId, nextTokenIdToMint)
        if (seen.has(tokenId)) continue
        seen.add(tokenId)

        result.push({
          tokenId,
          slug,
          title,
          parent,
          droppable: false,
          content: files[url],
        })
        if (!existingToken) nextTokenIdToMint++

        // Process nested list, if present
        const nextList = item.children?.find((n: any) => n.type === 'list')
        if (nextList) {
          walkList(nextList.children, tokenId)
        }
      }
    }
  }

  return result
}
