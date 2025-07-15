import {
  arbitrumSepoliaChainConfig,
  arbitrumSepoliaEnvironment,
} from './arbitrum-sepolia'
import { baseChainConfig, baseEnvironment } from './base'
import { polygonChainConfig, polygonEnvironment } from './polygon'
import { Chain } from 'thirdweb/chains'

export enum SupportedChainId {
  Base = baseChainConfig.id,
  ArbitrumSepolia = arbitrumSepoliaChainConfig.id,
  Polygon = polygonChainConfig.id,
}

export const mainNetworks: Chain[] = [baseChainConfig, polygonChainConfig]

export const testNetworks: Chain[] = [arbitrumSepoliaChainConfig]

export const allNetworks = [...mainNetworks, ...testNetworks]

export const networksEnvironments = {
  [SupportedChainId.Base]: baseEnvironment,
  [SupportedChainId.Polygon]: polygonEnvironment,
  [SupportedChainId.ArbitrumSepolia]: arbitrumSepoliaEnvironment,
}
