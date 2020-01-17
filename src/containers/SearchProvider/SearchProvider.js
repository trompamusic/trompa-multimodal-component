import React, { Component } from 'react';
import gql from 'graphql-tag';
import { setPrerenderReady, providers } from '../../utils';

export const SearchContext = React.createContext({});

class SearchProvider extends Component {
  state = {
    searchPhrase       : '',
    searchTags         : [],
    categories         : ['Person', 'MusicComposition', 'DigitalDocument', 'VideoObject'],
    selectedCategory   : 'all',
    searchResults      : [],
    searchResultsByType: {},
    counts             : {},
  };

  componentDidMount() {
    setPrerenderReady(true);
    this.runQuery();
  }

  setCategory = (event, category) => {
    this.setState({ selectedCategory: category });
  };

  handleSearchSubmit = (event, searchPhrase, searchTags) => {
    this.setState({ searchPhrase });
    this.setState({ searchTags });
    this.runQuery();
  };

  runQuery = () => {
    const { client } = this.props;

    client.query({
      query    : SEARCH_QUERY,
      variables: {
        searchPhrase: this.state.searchPhrase,
        categories  : this.state.categories,
      },
    }).then(data => {
      const searchResults = data.data.searchMetadataText;

      const counts = (searchResults || []).reduce((acc, value) => {
        if (typeof acc[value.__typename] === 'undefined') {
          acc[value.__typename] = searchResults.filter(({ __typename }) => __typename === value.__typename).length;
        }

        return acc;
      }, {});

      const searchResultsByType = Object.keys(counts).reduce((acc, value) => {
        acc[value] = searchResults.filter(({ __typename }) => __typename === value);

        return acc;
      }, {});

      this.setState({ searchResults, searchResultsByType, counts });
    });
  };

  render() {
    const { children } = this.props;

    return (
      <SearchContext.Provider
        value={{
          ...this.state,
          handleSearchSubmit: this.handleSearchSubmit,
          setCategory       : this.setCategory,
        }}
      >
        {children}
      </SearchContext.Provider>
    );
  }
}

export const SEARCH_QUERY = gql`
  query ($searchPhrase: String!, $categories: [MetadataInterfaceType]) {
    searchMetadataText(
      substring: $searchPhrase,
      onTypes: $categories,
      first: 500,
    ) {
      __typename
      ... on Person {
        identifier
        name
        jobTitle
        description
        image
        source
      }

      ... on MusicComposition {
        identifier
        name
        creator
        image
        source
      }

      ... on DigitalDocument {
        identifier
        name
        creator
        source
        version
        publisher
      }

      ... on VideoObject {
        identifier
        name
        url
        description
        duration
        image
        source
      }
    }
  }
`;

export default providers(SearchProvider);
