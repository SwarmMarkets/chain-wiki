import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { Base, Chain } from '@thirdweb-dev/chains'

export const baseEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://api.studio.thegraph.com/query/60829/chainwiki-base/version/latest`,
  contracts: {
    sx1155NFTFactoryAddress: '0x04620054fB4052Faf2a6A3F664149d574A907193',
  },
})

export const baseChainConfig: Chain = Base
