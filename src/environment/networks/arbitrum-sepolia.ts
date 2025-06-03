import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { ArbitrumSepolia, Chain } from '@thirdweb-dev/chains'
import { environment } from 'src/environment'

export const arbitrumSepoliaEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://api.studio.thegraph.com/query/60829/chain-wiki-testnet/v0.2.5`,
  contracts: {
    sx1155NFTFactoryAddress: '0xe3d5D82bFc090285FC2045a66F8eEdDEbE0dB9b5',
  },
})

export const arbitrumSepoliaChainConfig: Chain = {
  ...ArbitrumSepolia,
  // override because explorer url is not correct in thirdweb
  explorers: [
    { ...ArbitrumSepolia.explorers[0], url: 'https://sepolia.arbiscan.io' },
  ],
}
