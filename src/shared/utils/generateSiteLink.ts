import { generatePath } from 'react-router-dom'
import RoutePaths from '../enums/routes-paths'

export const generateSiteLink = (
  nftIdOrSlug: string,
  tokenIdOrSlug?: string
) => {
  const domain = window.location.origin

  if (tokenIdOrSlug) {
    return `${domain}${generatePath(RoutePaths.TOKEN_READ, {
      nftIdOrSlug: nftIdOrSlug,
      tokenIdOrSlug: tokenIdOrSlug,
    })}`
  } else {
    return `${domain}${generatePath(RoutePaths.NFT_READ, {
      nftIdOrSlug: nftIdOrSlug,
    })}`
  }
}
