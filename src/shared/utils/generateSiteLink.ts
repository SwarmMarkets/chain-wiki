import staticConfig from 'src/config'
import { getChainById } from './web3'
import Routes, { ChainParam } from '../consts/routes'

interface GenerateSiteLinkParams {
  nftIdOrSlug: string
  tokenIdOrSlug?: string
  chain?: number
  relative?: boolean
}

export const generateSiteLink = ({
  nftIdOrSlug,
  tokenIdOrSlug,
  chain: chainArg,
  relative = false,
}: GenerateSiteLinkParams) => {
  const domain =
    typeof window !== 'undefined' && !relative ? window.location.origin : ''

  const chain =
    (chainArg ? getChainById(chainArg) : staticConfig.defaultChain) ||
    staticConfig.defaultChain

  const chainParam = chain.name?.toLowerCase()[0] as ChainParam

  const pathname = tokenIdOrSlug
    ? Routes.read.token(nftIdOrSlug, tokenIdOrSlug, chainParam)
    : Routes.read.nft(nftIdOrSlug, chainParam)

  return `${domain}/${pathname}`
}
