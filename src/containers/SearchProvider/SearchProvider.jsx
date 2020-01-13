import React, { Component } from 'react';
import client from '../../graphql';
import gql from 'graphql-tag';
import { setPrerenderReady } from '../../utils';
import { providers } from '../../utils';

export const SearchContext = React.createContext({

});

class SearchProvider extends Component {
  state = {
    searchPhrase    : '',
    searchTags      : [],
    categories      : ['Person', 'MusicComposition', 'VideoObject', 'Article', 'Organization', 'Product', 'Place'],
    selectedCategory: 'all',
    searchResults   : [],
  }

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
    const searchResults = client.query({ query: SEARCH_QUERY, variables: {
        searchPhrase: this.state.searchPhrase,
        categories  : this.state.categories,
      } 
    }).then(console.log(searchResults));

    this.setState({ searchResults });
  }

  render() {
    const { children }      = this.props;
    const { searchResults } = this.state;

    return (
      <SearchContext.Provider value={{ 
        ...this.state, 
        handleSearchSubmit: this.handleSearchSubmit,
        setCategory       : this.setCategory,
        searchResults,
      }}>
        {children}
      </SearchContext.Provider>
    );
  }
}

export const SEARCH_QUERY = gql`
    query ($searchPhrase: String!, $categories: [MetadataInterfaceType]) {
      searchMetadataText(
        substring: $searchPhrase,
        onTypes: $categories
    ) {
        __typename
        ... on Person {
          identifier
          name
          jobTitle
          description
          image
        }
        
        ... on MusicComposition {
          identifier
          name
          creator
          image
        }

        ... on VideoObject {
          identifier
          name
          url
          description
          duration
          image
        }

        ... on Article {
          identifier
          name
          description
          image
        }

        ... on Organization {
          identifier
          name
          source
          description
          image
        }

        ... on Product {
          identifier
          name
          description
          source
        }

        ... on Place {
          identifier
          description
          source
          image
          name
        }
    }
  }
`;

export default providers(
  SearchProvider,
);
