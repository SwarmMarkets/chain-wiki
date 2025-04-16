import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { ArbitrumSepolia, Chain } from '@thirdweb-dev/chains'

export const arbitrumSepolia: NetworkConfiguration = {
  subgraphURL:
    'https://api.studio.thegraph.com/query/46523/chain-wiki-sepolia/v1.2.4',
  contracts: {
    sx1155NFTFactoryAddress: '0x476fd853b9b17dE423E2b05bbfb71B0Caa0eD812',
  },
}

export const arbitrumSepoliaChainConfig: Chain = {
  ...ArbitrumSepolia,
  // override because explorer url is not correct in thirdweb
  explorers: [
    { ...ArbitrumSepolia.explorers[0], url: 'https://sepolia.arbiscan.io' },
  ],
}
