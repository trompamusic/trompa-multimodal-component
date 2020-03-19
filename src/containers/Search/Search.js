import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { SearchContext } from '../SearchProvider/SearchProvider';
import { providers } from '../../utils';
import SearchResults from '../SearchResults';
import styles from './Search.styles';

export class Search extends Component {
  mergeSearchPhraseAndTags = (searchPhrase, searchTags) => {
    if (searchTags.length > 0) {
      const searchTagsString = searchTags.join(' ');
      const mergedString     = searchPhrase + ' ' + searchTagsString;

      return mergedString;
    }

    return searchPhrase;
  };

  render() {
    const { onResultClick } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, searchTags, categories, filter }) => (
          <SearchResults
            searchPhrase={this.mergeSearchPhraseAndTags(searchPhrase, searchTags)}
            categories={categories}
            filter={filter}
            onResultClick={onResultClick}
            customGraphQlQuery={this.props.customGraphQlQuery}
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
