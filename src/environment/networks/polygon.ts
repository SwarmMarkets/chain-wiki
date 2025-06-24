import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { Chain, polygon } from 'thirdweb/chains'

export const polygonEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: '',
  contracts: {
    sx1155NFTFactoryAddress: '0x9bfF9401F1807cDC9DcF48E67869Cf555244cE7C',
  },
})

export const polygonChainConfig: Chain = polygon
