import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';
import { providers, setPrerenderReady } from '../../utils';
import SearchBar from '../../components/SearchBar'
import styles from './Search.styles';
import SearchResults from '../../containers/SearchResults';

export const SearchContext = React.createContext({

});

export class Search extends Component {
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
    const { searchPhrase, categories, filter } = this.state;

    return (
      <SearchContext.Provider value={{ ...this.state, setCategory: this.setCategory }}>
        <React.Fragment>
          <Helmet>
            <title>Search</title>
          </Helmet>
          <SearchBar onSubmit={this.handleSearchSubmit} />
          <SearchResults searchPhrase={searchPhrase} categories={categories} filter={filter} />
        </React.Fragment>
      </SearchContext.Provider>
    );
  }
}

export default providers(
  Search,
  withStyles(styles),
);
