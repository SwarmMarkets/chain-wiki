import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { ArbitrumSepolia } from '@thirdweb-dev/chains'

export const arbitrumSepolia: NetworkConfiguration = {
  subgraphURL:
    'https://api.studio.thegraph.com/query/46523/chain-wiki-sepolia/version/latest',
  contracts: {
    sx1155NFTFactoryAddress: '0x4EE9e0BD3eA6ad6bd784D66cb1aE91da94E8941a',
  },
}

export const arbitrumSepoliaChainConfig = ArbitrumSepolia
