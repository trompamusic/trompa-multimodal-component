import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { providers } from '../../utils';
import SearchResults from '../SearchResults';
import styles from './Search.styles';

export class Search extends Component {
  render() {
    const { onResultClick } = this.props;

    return (
      <SearchResults onResultClick={onResultClick} />
    );
  }
}

export default providers(
  Search,
  withStyles(styles),
);
