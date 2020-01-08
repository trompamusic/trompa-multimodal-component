import React, { Component } from 'react';
import { providers, setPrerenderReady } from '../../utils';

export const SearchContext = React.createContext({

});

class SearchProvider extends Component {
  state = {
    searchPhrase: '',
    categories: ['Person', 'MusicComposition', 'VideoObject', 'Article', 'Organization', 'Product', 'Place'],
    selectedCategory: 'all',
  }

  componentDidMount() {
    setPrerenderReady(true);
  }

  setCategory = (event, category) => {
    this.setState({ selectedCategory: category });
  };

  handleSearchSubmit = (event, searchPhrase) => {
    this.setState({ searchPhrase })
  }

  render() {
    const { children } = this.props;

    return (
      <SearchContext.Provider value={{ 
        ...this.state, 
        handleSearchSubmit: this.handleSearchSubmit,
        setCategory       : this.setCategory 
      }}>
        {children}
      </SearchContext.Provider>
    );
  }
}

export default SearchProvider;
