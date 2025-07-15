import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { Chain, polygon } from 'thirdweb/chains'

export const polygonEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL:
    'https://proxy.polygon.chain.love/subgraphs/name/polygon/chainwiki-polygon',
  apiKey: 'f9tEp28A9xi7WP8hYoD11jSmeAnkwaAK9755i5NqoUE=',
  contracts: {
    sx1155NFTFactoryAddress: '0x9bfF9401F1807cDC9DcF48E67869Cf555244cE7C',
  },
})

export const polygonChainConfig: Chain = polygon
