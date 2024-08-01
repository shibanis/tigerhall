import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.tigerhall.net/v2/',
  cache: new InMemoryCache(),
});

export default client;
