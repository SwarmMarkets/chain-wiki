import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { Polygon, Chain } from '@thirdweb-dev/chains'
import { environment } from '..'

export const polygonEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: environment.polygonSubgraphUrl || '',
  contracts: {
    sx1155NFTFactoryAddress: '0x9bfF9401F1807cDC9DcF48E67869Cf555244cE7C',
  },
})

export const polygonChainConfig: Chain = Polygon
