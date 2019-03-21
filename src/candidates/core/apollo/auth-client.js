import ApolloClient from 'apollo-client/ApolloClient';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const authSettings = {
  uri: process.env.API_CANDIDATES_BASE_URL + '/auth/graphql',
  credentials: 'include',
  headers: {}
};

const httpLink = new HttpLink(authSettings);

const link = ApolloLink.from([
  httpLink
]);

const isProduction = (process.env.NODE_ENV === 'production');
const enableDevtools = !isProduction;

export const apolloAuthClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: enableDevtools,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    }
  }
});

export default apolloAuthClient;
