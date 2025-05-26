import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { Base, Chain } from '@thirdweb-dev/chains'
import { environment } from '..'

export const baseEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://gateway.thegraph.com/api/${environment.subgraphApiKey}/subgraphs/id/3PWCiLW4ZxG3o6RrJBgUaaYKkeMNuUsSVsHbmE4ptufq`,
  contracts: {
    sx1155NFTFactoryAddress: '0x04620054fB4052Faf2a6A3F664149d574A907193',
  },
})

export const baseChainConfig: Chain = Base
