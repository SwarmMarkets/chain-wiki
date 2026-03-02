import Routes from 'src/shared/consts/routes'
import { IpfsIndexPage, TokensQueryFullData } from 'src/shared/utils'
import { ISidebarTreeNode } from './SidebarTreeNode'

export const buildTree = (
  items: IpfsIndexPage[],
  nftSlug: string,
  parentId?: number | string,
  chain?: string,
  fullTokens?: TokensQueryFullData[] | null
): ISidebarTreeNode[] => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => {
      const matchingToken = fullTokens?.find(
        token =>
          token.slug === item.slug ||
          token.id.toLowerCase() === item.tokenId.toLowerCase()
      )
      const to =
        item.type === 'group'
          ? undefined
          : Routes.read.token(nftSlug, item.slug, chain)

      return {
        ...item,
        children: buildTree(
          items,
          nftSlug,
          item.tokenId,
          chain || undefined,
          fullTokens
        ),
        hasContent: !!matchingToken?.ipfsContent?.htmlContent?.trim(),
        to,
      }
    })
}
