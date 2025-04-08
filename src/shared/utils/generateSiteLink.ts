import { generatePath } from 'react-router-dom'
import RoutePaths from '../enums/routes-paths'

export const generateSiteLink = (nftId: string, tokenId?: string) => {
  const domain = window.location.origin

  if (tokenId) {
    return `${domain}${generatePath(RoutePaths.TOKEN_READ, {
      nftId,
      tokenId,
    })}`
  } else {
    return `${domain}${generatePath(RoutePaths.NFT_READ, { nftId })}`
  }
}
