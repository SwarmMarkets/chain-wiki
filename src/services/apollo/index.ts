import { ApolloClient, InMemoryCache } from '@apollo/client'
import staticConfig from 'src/config'
import { environment } from 'src/environment'
import {
  networksEnvironments,
  SupportedChainId,
} from 'src/environment/networks'

export const commonAppoloClientConfig = {
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${
      staticConfig.isDevMode
        ? environment.subgraphDevApiKey
        : environment.subgraphApiKey
    }`,
  },
}

const client = new ApolloClient({
  ...commonAppoloClientConfig,
  uri: staticConfig.defaultNetworkEnv.subgraphURL,
})

export const createClientForChain = (chainId: SupportedChainId) => {
  const chain = networksEnvironments[chainId]
  if (!chain) throw new Error(`Chain with id ${chainId} not supported`)

  return new ApolloClient({
    ...commonAppoloClientConfig,
    uri: chain.subgraphURL,
  })
}

export default client
