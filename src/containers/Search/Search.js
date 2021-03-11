import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { providers } from '../../utils';
import SearchResults from '../SearchResults';
import styles from './Search.styles';

export class Search extends Component {
  render() {
    const { onResultClick, renderSearchResult } = this.props;

    return (
      <SearchResults onResultClick={onResultClick} renderSearchResult={renderSearchResult} />
    );
  }
}

export default providers(
  Search,
  withStyles(styles),
);
