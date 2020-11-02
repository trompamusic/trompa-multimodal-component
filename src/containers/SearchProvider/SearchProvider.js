import React, { Component } from 'react';
import { setPrerenderReady } from '../../utils';
export const SearchContext = React.createContext({});

class SearchProvider extends Component {
  state = {
    loading      : true,
    searchPhrase : '',
    searchResults: [],
    filtersState : {},
    filters      : [],
    total        : 0,
  };

  componentDidMount() {
    setPrerenderReady(true);
    this.runQuery();
  }

  search = searchPhrase => {
    this.setState({ searchPhrase });

    return this.runQuery();
  };

  buildFilterState = filters => {
    const filterState = this.state.filtersState;

    return filters.reduce((acc, filter) => {
      acc[filter.name] = filterState[filter.name] || {
        filter,
        query   : '',
        selected: [],
      };

      return acc;
    }, {});
  };

  runQuery = async () => {
    this.setState({ loading: true });

    const searchResults = await this.props.config.buildSearchResults(this.props.client, this.state.searchPhrase, this.state.filtersState);

    if (searchResults) {
      this.setState({
        filters      : searchResults.filters,
        filtersState : this.buildFilterState(searchResults.filters),
        total        : searchResults.total,
        searchResults: searchResults.flattenedResults,
      });
    }

    this.setState({ loading: false });
  };

  updateFilter = (filter, filterSearchPhrase = '', selected = []) => {
    const filtersState =  { ...this.state.filtersState };

    if (!filtersState[filter.name]) {
      filtersState[filter.name] = {
        search  : filterSearchPhrase,
        selected: selected,
        filter,
      };
    } else {
      filtersState[filter.name].search   = filterSearchPhrase;
      filtersState[filter.name].selected = selected;
    }

    this.setState({ filtersState });
    this.runQuery();
  };

  render() {
    const { children } = this.props;

    return (
      <SearchContext.Provider value={{ ...this.state, search: this.search, updateFilter: this.updateFilter }}>
        {children}
      </SearchContext.Provider>
    );
  }
}

export default SearchProvider;
