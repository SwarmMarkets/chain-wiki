import { ApolloClient, InMemoryCache } from '@apollo/client'
import staticConfig from 'src/config'
import { environment } from 'src/environment'


export const commonAppoloClientConfig = {
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${staticConfig.isDevMode ? environment.subgraphDevApiKey : environment.subgraphApiKey}`,
  },
}

const client = new ApolloClient({
  ...commonAppoloClientConfig,
  uri: staticConfig.defaultNetworkEnv.subgraphURL,
})

export default client
