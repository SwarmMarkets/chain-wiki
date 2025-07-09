import { generatePath } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'
import { IpfsIndexPage } from 'src/shared/utils'
import { ISidebarTreeNode } from './SidebarTreeNode'

export const buildTree = (
  items: IpfsIndexPage[],
  nftSlug: string,
  parentId?: number | string
): ISidebarTreeNode[] => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => {
      const to =
        item.type === 'group'
          ? undefined
          : generatePath(RoutePaths.TOKEN_READ, {
              tokenIdOrSlug: item.slug,
              nftIdOrSlug: nftSlug,
            })

      return {
        ...item,
        children: buildTree(items, nftSlug, item.tokenId),
        to,
      }
    })
}
