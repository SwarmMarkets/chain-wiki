import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { base, Chain } from 'thirdweb/chains'

export const baseEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://proxy.base.chain.love/subgraphs/name/base/chainwiki-base`,
  contracts: {
    sx1155NFTFactoryAddress: '0xB4D93753436f5C3b7292990650FE9F70164C98c2',
    sx1155NFTImplementationAddress:
      process.env.NEXT_PUBLIC_SX1155_IMPLEMENTATION_BASE || '',
  },
})

export const baseChainConfig: Chain = base
