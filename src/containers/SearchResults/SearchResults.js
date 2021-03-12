import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider';
import SearchResultsComponent from '../../components/SearchResults';
import styles from './SearchResults.styles';

class SearchResults extends Component {
  render() {
    const { classes, onResultClick, renderSearchResult } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, searchResults, total, loading }) => {
          return (
            <div className={classes.root}>
              <div className={classes.resultsContainer}>
                <SearchResultsComponent
                  total={total}
                  loading={loading}
                  searchResults={searchResults}
                  searchPhrase={searchPhrase}
                  onResultClick={onResultClick}
                  renderSearchResult={renderSearchResult}
                />
              </div>
            </div>
          );
        }}
      </SearchContext.Consumer>
    );
  }
}

export default providers(
  SearchResults,
  withTranslation('searchResults'),
  withStyles(styles),
);
