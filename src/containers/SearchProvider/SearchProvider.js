import React, { Component } from 'react';
import gql from 'graphql-tag';
import { setPrerenderReady, providers } from '../../utils';

export const SearchContext = React.createContext({});

class SearchProvider extends Component {
  state = {
    searchPhrase    : '',
    searchTags      : [],
    categories      : ['Person', 'MusicComposition', 'DigitalDocument', 'VideoObject'],
    selectedCategory: 'all',
    searchResults   : {},
    counts          : {},
    total           : 0,
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

    client
      .query({
        query    : SEARCH_QUERY,
        variables: {
          searchPhrase: this.state.searchPhrase,
          categories  : this.state.categories,
        },
      })
      .then(data => {
        const searchResults = data.data || {};

        const counts = Object.keys(searchResults).reduce((acc, value) => {
          acc[value] = searchResults[value].length;

          return acc;
        }, {});

        const total = Object.keys(counts).reduce((acc, value) => {
          return acc + counts[value];
        }, 0);

        this.setState({ searchResults, counts, total });
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
  fragment thingFields on ThingInterface {
    __typename
    identifier
    name
    description
    image
  }

  fragment metadataFields on MetadataInterface {
    creator
    source
  }

  query ($searchPhrase: String!, $first: Int = 50) {
    Person (filter: { name_contains: $searchPhrase }, first: $first) {
      jobTitle
      ...thingFields
      ...metadataFields
    }

    MusicComposition (filter: { name_contains: $searchPhrase }, first: $first) {
      ...thingFields
      ...metadataFields
    }

    DigitalDocument (filter: { name_contains: $searchPhrase }, first: $first) {
      version
      publisher
      ...thingFields
      ...metadataFields
    }

    VideoObject (filter: { name_contains: $searchPhrase }, first: $first) {
      url
      description
      duration
      ...thingFields
      ...metadataFields
    }
  }
`;

export default providers(SearchProvider);
