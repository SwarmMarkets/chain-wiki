import { ApolloClient, InMemoryCache } from '@apollo/client'
import { arbitrumSepolia } from 'src/environment/networks'

const client = new ApolloClient({
  uri: arbitrumSepolia.subgraphURL,
  cache: new InMemoryCache(),
})

export default client
