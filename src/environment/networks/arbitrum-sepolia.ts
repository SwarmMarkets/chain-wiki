import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { ArbitrumSepolia, Chain } from '@thirdweb-dev/chains'
import { environment } from 'src/environment'

export const arbitrumSepoliaEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://gateway.thegraph.com/api/${environment.subgraphApiKey}/subgraphs/id/5e8ucLJSGPd2fy54u8GuaLctKHSWPctUPLYqtTHpL1JX`,
  contracts: {
    sx1155NFTFactoryAddress: '0x8cEAb2Cc2238889249CdF6134ca485628E75C2ca',
  },
})

export const arbitrumSepoliaChainConfig: Chain = {
  ...ArbitrumSepolia,
  // override because explorer url is not correct in thirdweb
  explorers: [
    { ...ArbitrumSepolia.explorers[0], url: 'https://sepolia.arbiscan.io' },
  ],
}
