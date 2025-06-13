import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { ArbitrumSepolia, Chain } from '@thirdweb-dev/chains'
import { environment } from 'src/environment'

export const arbitrumSepoliaEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://gateway.thegraph.com/api/${environment.subgraphApiKey}/subgraphs/id/5e8ucLJSGPd2fy54u8GuaLctKHSWPctUPLYqtTHpL1JX`,
  contracts: {
    sx1155NFTFactoryAddress: '0xD80738Df6a3ad838fbD6c8aF93DEE55BD93070A9',
  },
})

export const arbitrumSepoliaChainConfig: Chain = {
  ...ArbitrumSepolia,
  // override because explorer url is not correct in thirdweb
  explorers: [
    { ...ArbitrumSepolia.explorers[0], url: 'https://sepolia.arbiscan.io' },
  ],
}
