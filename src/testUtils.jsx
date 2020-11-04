import React from 'react';
import { ApolloProvider } from 'react-apollo';
import 'url-search-params-polyfill';
import { getApolloClient } from './client';

const client = getApolloClient('https://api-test.trompamusic.eu');

export const provided = node => (
  <ApolloProvider client={client}>
    {node}
  </ApolloProvider>
);
