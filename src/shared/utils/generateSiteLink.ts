import staticConfig from 'src/config'
import { getChainById } from './web3'

interface GenerateSiteLinkParams {
  nftIdOrSlug: string
  tokenIdOrSlug?: string
  chain?: number
  relative?: boolean
}

export const generateSiteLink = ({
  nftIdOrSlug,
  tokenIdOrSlug,
  chain: chainParam,
  relative = false,
}: GenerateSiteLinkParams) => {
  const domain =
    typeof window !== 'undefined' && !relative ? window.location.origin : ''

  const chain =
    (chainParam ? getChainById(chainParam) : staticConfig.defaultChain) ||
    staticConfig.defaultChain

  // const search = chain.id !== baseChainConfig.id ? `?chain=${chain.name}` : ''

  if (tokenIdOrSlug) {
    return `${domain}/${chain.name?.toLowerCase()}${nftIdOrSlug}/${tokenIdOrSlug}`
  } else {
    return `${domain}/${chain.name?.toLowerCase()}/${nftIdOrSlug}`
  }
}
