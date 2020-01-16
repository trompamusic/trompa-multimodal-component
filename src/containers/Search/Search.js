import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { SearchContext } from '../SearchProvider/SearchProvider';
import { providers } from '../../utils';
import styles from './Search.styles';
import SearchResults from '../SearchResults';

export class Search extends Component {
  mergeSearchPhraseAndTags = (searchPhrase, searchTags) => {
    if (searchTags.length > 0) {
      const searchTagsString = searchTags.join(' ');
      const mergedString = searchPhrase + ' ' + searchTagsString;

      return mergedString;
    }
    return searchPhrase;
  };

  render() {
    return (
      <SearchContext.Consumer>
        {({ searchPhrase, searchTags, categories, filter }) => (
          <SearchResults
            searchPhrase={this.mergeSearchPhraseAndTags(searchPhrase, searchTags)}
            categories={categories}
            filter={filter}
          />
        )}
      </SearchContext.Consumer>
    );
  }
}

export default providers(
  Search,
  withStyles(styles),
);
