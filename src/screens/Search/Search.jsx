import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';
import { providers, setPrerenderReady } from '../../utils';
import { SearchContext } from '../../components/SearchProvider/SearchProvider';
import styles from './Search.styles';
import SearchResults from '../../containers/SearchResults';

export class Search extends Component {
  componentDidMount() {
    setPrerenderReady(true);
  }

  render() {
    return (
      <SearchContext.Consumer>
        {({ searchPhrase, categories, filter }) => (
          <React.Fragment>
            <Helmet>
              <title>Search</title>
            </Helmet>
            <SearchResults searchPhrase={searchPhrase} categories={categories} filter={filter} />
          </React.Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default providers(
  Search,
  withStyles(styles),
);
