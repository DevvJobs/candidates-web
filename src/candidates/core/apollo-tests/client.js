import ApolloClient from 'apollo-client/ApolloClient';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';

const authSettings = {
  uri: process.env.API_TESTS_BASE_URL + '/graphql',
  credentials: 'include',
  headers: {
    'X-Devv-Auth': {
      toString () {
        return localStorage.getItem('token-tests') || '';
      }
    }
  }
};

const httpLink = new HttpLink(authSettings);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    localStorage.removeItem('token-tests');
    window.location.replace('/');
  }
});
const link = ApolloLink.from([
  errorLink,
  httpLink
]);

const isProduction = (process.env.NODE_ENV === 'production');
const enableDevtools = !isProduction;

export const apolloTestsClient = new ApolloClient({
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

export default apolloTestsClient;
