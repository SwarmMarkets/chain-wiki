import { Chain } from '@thirdweb-dev/chains'
import {
  arbitrumSepoliaChainConfig,
  arbitrumSepoliaEnvironment,
} from './arbitrum-sepolia'
import { baseChainConfig, baseEnvironment } from './base'

export enum SupportedChainId {
  Base = baseChainConfig.chainId,
  ArbitrumSepolia = arbitrumSepoliaChainConfig.chainId,
}

export const mainNetworks: Chain[] = [baseChainConfig]

export const testNetworks: Chain[] = [arbitrumSepoliaChainConfig]

export const allNetworks = [...mainNetworks, ...testNetworks]

export const networksEnvironments = {
  [SupportedChainId.Base]: baseEnvironment,
  [SupportedChainId.ArbitrumSepolia]: arbitrumSepoliaEnvironment,
}
