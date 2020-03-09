import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import * as PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core';
import { ApolloProvider } from 'react-apollo';
import SearchProvider from './containers/SearchProvider';
import { Search } from './containers/Search';
import theme from './theme';
import i18n from './i18n';
import { getApolloClient } from './client';
import NavBar from './containers/NavBar';

export class MultiModalComponent extends Component {
  static propTypes = {
    uri          : PropTypes.string,
    filterTypes  : PropTypes.arrayOf(PropTypes.string),
    onResultClick: PropTypes.func,
  };

  static defaultProps = {
    uri          : 'https://api-test.trompamusic.eu',
    filterTypes  : ['Person', 'MusicComposition', 'DigitalDocument', 'VideoObject'],
    onResultClick: () => true,
  };

  constructor(props) {
    super(props);

    this.client      = getApolloClient(this.props.uri);
    this.filterTypes = this.props.filterTypes;
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <SearchProvider client={this.client} filterTypes={this.filterTypes}>
              <NavBar />
              <Search onResultClick={this.props.onResultClick} />
            </SearchProvider>
          </I18nextProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}
