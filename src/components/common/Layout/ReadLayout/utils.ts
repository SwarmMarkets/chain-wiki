import Routes from 'src/shared/consts/routes'
import { IpfsIndexPage } from 'src/shared/utils'
import { ISidebarTreeNode } from './SidebarTreeNode'

export const buildTree = (
  items: IpfsIndexPage[],
  nftSlug: string,
  parentId?: number | string,
  chain?: string
): ISidebarTreeNode[] => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => {
      const to =
        item.type === 'group'
          ? undefined
          : Routes.read.token(nftSlug, item.slug, chain)

      return {
        ...item,
        children: buildTree(items, nftSlug, item.tokenId, chain || undefined),
        to,
      }
    })
}
