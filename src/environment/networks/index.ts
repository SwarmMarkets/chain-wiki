import { Chain } from '@thirdweb-dev/chains'
import {
  arbitrumSepoliaChainConfig,
  arbitrumSepoliaEnvironment,
} from './arbitrum-sepolia'
import { baseChainConfig, baseEnvironment } from './base'
import { polygonChainConfig, polygonEnvironment } from './polygon'
import { environment } from '..'

export enum SupportedChainId {
  Base = baseChainConfig.chainId,
  ArbitrumSepolia = arbitrumSepoliaChainConfig.chainId,
  Polygon = polygonChainConfig.chainId,
}

const polygonConfig = environment.polygonSubgraphUrl ? [polygonChainConfig] : []

export const mainNetworks: Chain[] = [baseChainConfig, ...polygonConfig]

export const testNetworks: Chain[] = [arbitrumSepoliaChainConfig]

export const allNetworks = [...mainNetworks, ...testNetworks]

export const networksEnvironments = {
  [SupportedChainId.Base]: baseEnvironment,
  [SupportedChainId.Polygon]: polygonEnvironment,
  [SupportedChainId.ArbitrumSepolia]: arbitrumSepoliaEnvironment,
}
