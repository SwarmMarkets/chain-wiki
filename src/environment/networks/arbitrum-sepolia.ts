import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { ArbitrumSepolia, Chain } from '@thirdweb-dev/chains'
import { environment } from 'src/environment'

export const arbitrumSepoliaEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://api.studio.thegraph.com/query/60829/chain-wiki-testnet/version/latest`,
  contracts: {
    sx1155NFTFactoryAddress: '0x476fd853b9b17dE423E2b05bbfb71B0Caa0eD812',
  },
})

export const arbitrumSepoliaChainConfig: Chain = {
  ...ArbitrumSepolia,
  // override because explorer url is not correct in thirdweb
  explorers: [
    { ...ArbitrumSepolia.explorers[0], url: 'https://sepolia.arbiscan.io' },
  ],
}
