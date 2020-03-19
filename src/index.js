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
    uri           : PropTypes.string,
    disableFilters: PropTypes.bool,
    filterTypes   : PropTypes.arrayOf(PropTypes.string),
    renderResult  : PropTypes.arrayOf(PropTypes.object),
    onResultClick : PropTypes.func,
  };

  static defaultProps = {
    uri           : 'https://api-test.trompamusic.eu',
    disableFilters: false,
    filterTypes   : ['Person', 'MusicComposition', 'DigitalDocument', 'VideoObject'],
    renderResult  : [],
    onResultClick : () => true,
  };

  constructor(props) {
    super(props);

    this.client         = getApolloClient(this.props.uri);
    this.disableFilters = this.props.disableFilters;
    this.filterTypes    = this.props.filterTypes;
    this.renderResult   = this.props.renderResult;
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <MuiThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <SearchProvider 
              client={this.client} 
              disableFilters={this.disableFilters}
              filterTypes={this.filterTypes}
              renderResult={this.renderResult}
            >
              <NavBar />
              <Search onResultClick={this.props.onResultClick} />
            </SearchProvider>
          </I18nextProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}
