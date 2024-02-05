import { mumbai, mumbaiChainConfig } from './mumbai'
import { Chain } from "@thirdweb-dev/chains";

const supportedChains: Chain[] = [mumbaiChainConfig]

export {
  supportedChains,
  mumbaiChainConfig,
  mumbai,
}