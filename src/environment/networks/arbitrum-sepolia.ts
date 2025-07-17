import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { arbitrumSepolia, Chain } from 'thirdweb/chains'

export const arbitrumSepoliaEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://gateway.thegraph.com/api/subgraphs/id/5e8ucLJSGPd2fy54u8GuaLctKHSWPctUPLYqtTHpL1JX`,
  contracts: {
    sx1155NFTFactoryAddress: '0xD80738Df6a3ad838fbD6c8aF93DEE55BD93070A9',
  },
})

export const arbitrumSepoliaChainConfig: Chain = arbitrumSepolia
