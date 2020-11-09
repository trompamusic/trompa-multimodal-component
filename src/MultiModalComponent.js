import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import * as PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import SearchProvider from './containers/SearchProvider';
import { Search } from './containers/Search';
import i18n from './i18n';
import { getApolloClient } from './client';
import NavBar from './containers/NavBar';
import SearchConfig from './search/SearchConfig';

class MultiModalComponent extends Component {
  static propTypes = {
    config         : PropTypes.instanceOf(SearchConfig).isRequired,
    uri            : PropTypes.string,
    onResultClick  : PropTypes.func,
    placeholderText: PropTypes.string,
  };

  static defaultProps = {
    uri            : 'https://api-test.trompamusic.eu',
    onResultClick  : () => true,
    placeholderText: 'Enter your search phrase...',
  };

  constructor(props) {
    super(props);

    this.client = getApolloClient(this.props.uri);
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <I18nextProvider i18n={i18n}>
          <SearchProvider client={this.client} config={this.props.config}>
            <NavBar placeholderText={this.props.placeholderText} />
            <Search onResultClick={this.props.onResultClick} />
          </SearchProvider>
        </I18nextProvider>
      </ApolloProvider>
    );
  }
}

export default MultiModalComponent;
