import { ApolloClient, InMemoryCache } from '@apollo/client'
import staticConfig from 'src/config'

const client = new ApolloClient({
  uri: staticConfig.defaultNetworkEnv.subgraphURL,
  cache: new InMemoryCache(),
})

export default client
