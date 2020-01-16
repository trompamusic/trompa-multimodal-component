import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider } from '@material-ui/core/styles';
import 'url-search-params-polyfill';
import client from './graphql/index';
import theme from './theme';

export const provided = node => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      {node}
    </MuiThemeProvider>
  </ApolloProvider>
);
