import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { base, Chain } from 'thirdweb/chains'
import { environment } from '..'

export const baseEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://proxy.base.chain.love/subgraphs/name/base/chainwiki-base`,
  contracts: {
    sx1155NFTFactoryAddress: '0xB4D93753436f5C3b7292990650FE9F70164C98c2',
  },
})

export const baseChainConfig: Chain = base
