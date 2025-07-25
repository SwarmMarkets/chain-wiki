import { generatePath } from 'react-router-dom'
import RoutePaths from '../enums/routes-paths'
import staticConfig from 'src/config'
import { baseChainConfig } from 'src/environment/networks/base'

export const generateSiteLink = (
  nftIdOrSlug: string,
  tokenIdOrSlug?: string
) => {
  const domain = window.location.origin

  const network = staticConfig.defaultChain

  const search =
    network.id !== baseChainConfig.id ? `?chain=${network.name}` : ''

  if (tokenIdOrSlug) {
    return `${domain}${generatePath(RoutePaths.TOKEN_READ, {
      nftIdOrSlug,
      tokenIdOrSlug,
    })}${search}`
  } else {
    return `${domain}${generatePath(RoutePaths.NFT_READ, {
      nftIdOrSlug,
    })}${search}`
  }
}
