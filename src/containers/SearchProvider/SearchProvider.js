import React, { Component } from 'react';
import gql from 'graphql-tag';
import { setPrerenderReady, providers } from '../../utils';
import { 
  SEARCH_PERSONS_QUERY,
  SEARCH_MUSIC_COMPOSITION_QUERY,
  SEARCH_DIGITAL_DOCUMENT_QUERY,
  SEARCH_VIDEO_OBJECT_QUERY,
} from '../../queries/queries';

export const SearchContext = React.createContext({});

class SearchProvider extends Component {
  state = {
    searchPhrase    : '',
    searchTags      : [],
    categories      : this.props.filterTypes,
    selectedCategory: 'all',
    searchResults   : {},
    counts          : {},
    total           : 0,
  };

  categorySearchQueries = {
    'Person'          : SEARCH_PERSONS_QUERY,
    'MusicComposition': SEARCH_MUSIC_COMPOSITION_QUERY,
    'DigitalDocument' : SEARCH_DIGITAL_DOCUMENT_QUERY,
    'VideoObject'     : SEARCH_VIDEO_OBJECT_QUERY,
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
    const { client }            = this.props;

    client
      .query({
        query    : this.SEARCH_QUERY,
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

        if (this.props.filterTypes.length === 1) {
          this.setState({ selectedCategory: this.props.filterTypes[0] });
        }

        this.setState({ searchResults, counts, total });
      });
  };

  render() {
    const { children } = this.props;

    return (
      <SearchContext.Provider
        value={{
          ...this.state,
          disableFilters    : this.props.disableFilters,
          filterTypes       : this.props.filterTypes,
          handleSearchSubmit: this.handleSearchSubmit,
          setCategory       : this.setCategory,
        }}
      >
        {children}
      </SearchContext.Provider>
    );
  }

  SEARCH_QUERY = gql`
  query ($searchPhrase: String!, $first: Int = 50) {
    ${this.state.categories.map(category => this.categorySearchQueries[category])}
  }
`;
}

export default providers(SearchProvider);
