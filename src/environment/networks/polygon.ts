import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { Chain, polygon } from 'thirdweb/chains'

export const polygonEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL:
    'https://api.subgraph.ormilabs.com/api/public/da826f4f-39ce-4acf-b4dd-7f36c948655e/subgraphs/chainwiki-polygon/v0.0.1/gn',
  contracts: {
    sx1155NFTFactoryAddress: '0x9bfF9401F1807cDC9DcF48E67869Cf555244cE7C',
    sx1155NFTImplementationAddress:
      process.env.NEXT_PUBLIC_SX1155_IMPLEMENTATION_POLYGON || '',
  },
})

export const polygonChainConfig: Chain = polygon
