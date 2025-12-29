import { NetworkConfiguration } from 'src/shared/types/network-configuration'
import { base, Chain } from 'thirdweb/chains'

export const baseEnvironment: NetworkConfiguration = Object.freeze({
  subgraphURL: `https://gateway.thegraph.com/api/subgraphs/id/2z83Z4oed2ynQrbyHVcqn4ARSFfpX5a2MDZbLuEvhsho`,
  contracts: {
    sx1155NFTFactoryAddress: '0xB4D93753436f5C3b7292990650FE9F70164C98c2',
  },
})

export const baseChainConfig: Chain = base
