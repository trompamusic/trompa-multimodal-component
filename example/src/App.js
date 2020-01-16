import React, { Component } from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { MultiModalComponent } from 'trompa-multimodal-component'

const client = new ApolloClient({
  uri: 'https://api-test.trompamusic.eu/',
});

const App = () => {
    return (
      <ApolloProvider client={client}>
        <MultiModalComponent text='Modern React component module' />
      </ApolloProvider>
    );
};

export default App;
