import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';
import { providers, setPrerenderReady } from '../../utils';
import { SearchContext } from '../../containers/SearchProvider/SearchProvider';
import styles from './Search.styles';
import SearchResults from '../../containers/SearchResults';

export class Search extends Component {
  componentDidMount() {
    setPrerenderReady(true);
  }

  mergeSearchPhraseAndTags = (searchPhrase, searchTags) => {
    if (searchTags.length > 0) {
      const searchTagsString = searchTags.join(' ');
      const mergedString     = searchPhrase + ' ' + searchTagsString;

      return mergedString;
    }
    return searchPhrase;
  }

  render() {
    return (
      <SearchContext.Consumer>
        {({ searchPhrase, searchTags, categories, filter }) => (
          <React.Fragment>
            <Helmet>
              <title>Search</title>
            </Helmet>
            <SearchResults searchPhrase={this.mergeSearchPhraseAndTags(searchPhrase, searchTags)} categories={categories} filter={filter} />
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
