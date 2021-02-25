import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { getApolloClient } from './client';

const client = getApolloClient('https://api-test.trompamusic.eu');

export const provided = node => (
  <ApolloProvider client={client}>
    {node}
  </ApolloProvider>
);
