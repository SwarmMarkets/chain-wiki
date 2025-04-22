import { ContentItemParent } from '../types/content'

export const buildContentHierarchy = (
  contentElems: NodeListOf<Element>
): ContentItemParent[] => {
  const hierarchy: ContentItemParent[] = []
  let currentParent: ContentItemParent | null = null

  contentElems.forEach((heading: Element, index: number) => {
    const title = heading.textContent || ''
    const tag = heading.tagName

    const contentItem = {
      id: index,
      title,
      elem: heading,
      tag,
    }

    if (tag === 'H1') {
      currentParent = { ...contentItem, childs: null }
      hierarchy.push(currentParent)
    } else if (tag === 'H2' && currentParent) {
      if (!currentParent.childs) {
        currentParent.childs = []
      }
      currentParent.childs.push(contentItem)
    }
  })

  return hierarchy
}
