import { generatePath } from 'react-router-dom'
import RoutePaths from '../enums/routes-paths'
import staticConfig from 'src/config'
import { baseChainConfig } from 'src/environment/networks/base'
import { getChainById } from './web3'

interface GenerateSiteLinkParams {
  nftIdOrSlug: string
  tokenIdOrSlug?: string
  chain?: number
}

export const generateSiteLink = ({
  nftIdOrSlug,
  tokenIdOrSlug,
  chain: chainParam,
}: GenerateSiteLinkParams) => {
  const domain = window.location.origin

  const chain =
    (chainParam ? getChainById(chainParam) : staticConfig.defaultChain) ||
    staticConfig.defaultChain

  const search = chain.id !== baseChainConfig.id ? `?chain=${chain.name}` : ''

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
