import { ApolloClient, InMemoryCache } from '@apollo/client'
import staticConfig from 'src/config'
import { environment } from 'src/environment'

const client = new ApolloClient({
  uri: staticConfig.defaultNetworkEnv.subgraphURL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${environment.subgraphApiKey}`,
  },
})

export default client
