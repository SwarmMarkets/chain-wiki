import { NetworkConfiguration } from '@src/shared/types/network-configuration'
import { Mumbai } from '@thirdweb-dev/chains'

export const mumbai: NetworkConfiguration = {
  subgraphURL: 'https://api.studio.thegraph.com/query/46523/chain-wiki/v0.1.1',
  contracts: {
    sx1155NFTFactoryAddress: '0x695d66762C05c0B1644eD34467215cCf1AdAe3d0'
  }
}

export const mumbaiChainConfig = Mumbai
