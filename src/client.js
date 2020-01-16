import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import introspectionQueryResultData from './fragmentTypes';

export const getApolloClient = uri => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });

  const cache = new InMemoryCache({ fragmentMatcher });

  return new ApolloClient({
    cache,
    link: new HttpLink({
      uri,
    }),
  })
};
