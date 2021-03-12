import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import * as PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import SearchProvider from './containers/SearchProvider';
import { Search } from './containers/Search';
import { getI18n } from './i18n';
import { getApolloClient } from './client';
import NavBar from './containers/NavBar';
import SearchConfig from './search/SearchConfig';

class MultiModalComponent extends Component {
  static propTypes = {
    config            : PropTypes.instanceOf(SearchConfig).isRequired,
    uri               : PropTypes.string,
    onResultClick     : PropTypes.func,
    placeholderText   : PropTypes.string,
    renderSearchResult: PropTypes.func,
    i18n              : PropTypes.shape({
      'nl-NL': PropTypes.object,
      'en-US': PropTypes.object,
    }),
  };

  static defaultProps = {
    uri          : 'https://api-test.trompamusic.eu',
    onResultClick: () => true,
  };

  constructor(props) {
    super(props);

    this.client = getApolloClient(this.props.uri);
    this.i18n   = getI18n(props.i18n);
  }

  render() {
    const { config, placeholderText, onResultClick, renderSearchResult } = this.props;

    // renderSearchResult is defined, but it is not a function
    if (!!renderSearchResult && typeof renderSearchResult !== 'function') {
      console.error(`MultiModalComponent: \`renderSearchResult\` should be a function but is type \`${typeof renderSearchResult}\``);
    }

    // onResultClick is defined, but is not a function
    if (!!onResultClick && typeof onResultClick !== 'function') {
      console.error(`MultiModalComponent: \`onResultClick\` should be a function but is type \`${typeof onResultClick}\``);
    }

    return (
      <ApolloProvider client={this.client}>
        <I18nextProvider i18n={this.i18n}>
          <SearchProvider client={this.client} config={config}>
            <NavBar placeholderText={placeholderText} />
            <Search onResultClick={onResultClick} renderSearchResult={renderSearchResult} />
          </SearchProvider>
        </I18nextProvider>
      </ApolloProvider>
    );
  }
}

export default MultiModalComponent;
