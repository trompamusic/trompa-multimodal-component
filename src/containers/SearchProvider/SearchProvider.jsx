import React, { Component } from 'react';
import { setPrerenderReady } from '../../utils';

export const SearchContext = React.createContext({

});

class SearchProvider extends Component {
  state = {
    searchPhrase    : '',
    searchTags      : [],
    categories      : ['Person', 'MusicComposition', 'DigitalDocument', 'VideoObject'],
    selectedCategory: 'all',
  }

  componentDidMount() {
    setPrerenderReady(true);
  }

  setCategory = (event, category) => {
    this.setState({ selectedCategory: category });
  };

  handleSearchSubmit = (event, searchPhrase, searchTags) => {
    this.setState({ searchPhrase });
    this.setState({ searchTags });
  };

  render() {
    const { children } = this.props;

    return (
      <SearchContext.Provider value={{ 
        ...this.state, 
        handleSearchSubmit: this.handleSearchSubmit,
        setCategory       : this.setCategory,
      }}>
        {children}
      </SearchContext.Provider>
    );
  }
}

export default SearchProvider;
