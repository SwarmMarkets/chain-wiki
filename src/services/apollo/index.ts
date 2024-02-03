import { ApolloClient, InMemoryCache } from '@apollo/client';
import { environment } from '@src/environment';

const client = new ApolloClient({
  uri: environment.subgraphURL,
  cache: new InMemoryCache(),
});

export default client