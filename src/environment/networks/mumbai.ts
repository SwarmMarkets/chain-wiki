import { NetworkConfiguration } from "@src/shared/types/network-configuration";

export const mumbai: NetworkConfiguration = {
  subgraphURL: 'https://api.studio.thegraph.com/proxy/46523/chain-wiki/version/latest',
  contracts: {
    sx1155NFTFactoryAddress: '0xdEA790E5888B04004b6890a8DBAcd07358006273'
  }
}