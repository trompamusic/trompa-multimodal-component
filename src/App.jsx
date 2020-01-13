import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import JssProvider from 'react-jss/lib/JssProvider';
import theme from './theme';
import client from './graphql';
import Root from './components/Root';
import SearchProvider from './containers/SearchProvider/SearchProvider';

const createClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix       : 'c',
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const forceRefresh = !('pushState' in window.history);

    return (
      <ApolloProvider client={client}>
        <JssProvider generateClassName={createClassName}>
          <MuiThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <BrowserRouter forceRefresh={forceRefresh}>
                <SearchProvider>
                  <Root error={this.state.error} />
                </SearchProvider>
              </BrowserRouter>
            </I18nextProvider>
          </MuiThemeProvider>
        </JssProvider>
      </ApolloProvider>
    );
  }
}

export default App;
