import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import { withTranslation } from 'react-i18next';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import VideoCamIcon from '@material-ui/icons/Videocam';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider';
import SearchFilters from '../SearchFilters';
import SearchResult from '../../components/SearchResult';
import SearchResultsComponent from '../../components/SearchResults';
import styles from './SearchResults.styles';

class SearchResults extends Component {
  renderTypeResult(typeName, item) {
    const { onResultClick, t } = this.props;

    switch (typeName) {
    case 'Person':
      return (
        <SearchResult
          icon={AccountCircleIcon}
          variant="default"
          type={typeName}
          heading={item.subject || item.jobTitle || t('emptyResults.noRole')}
          title={item.name}
          source={item.source}
          onClick={() => onResultClick(item)}
        />
      );
    case 'MusicComposition':
      return (
        <SearchResult
          icon={LibraryMusicIcon}
          variant="default"
          type={typeName}
          heading={item.creator}
          title={item.name}
          source={item.source}
          onClick={() => onResultClick(item)}
        />
      );
    case 'DigitalDocument':
      return (
        <SearchResult
          icon={LibraryMusicIcon}
          variant="default"
          type={typeName}
          heading={`${item.creator} • ${item.name}`}
          title={item.name}
          source={item.source}
          onClick={() => onResultClick(item)}
        />
      );
    case 'AudioObject':
      return (
        <SearchResult
          icon={MusicNoteIcon}
          variant="default"
          type={typeName}
          title={item.name}
          source={item.source}
          onClick={() => onResultClick(item)}
        />
      );
    case 'VideoObject':
      return (
        <SearchResult
          icon={VideoCamIcon}
          variant="default"
          type={typeName}
          title={item.name}
          source={item.source}
          onClick={() => onResultClick(item)}
        />
      );
    default:
      return null;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, searchResults, total, loading }) => {
          return (
            <Grid className={classes.root}>
              <Grid xs={12} md={3} item>
                <SearchFilters />
              </Grid>
              <Grid xs={12} md={9} className={classes.resultsContainer} item>
                <SearchResultsComponent
                  total={total}
                  loading={loading}
                  searchResults={searchResults}
                  searchPhrase={searchPhrase}
                />
              </Grid>
            </Grid>
          );}}
      </SearchContext.Consumer>
    );
  }
}

export default providers(
  SearchResults,
  withTranslation('searchResults'),
  withStyles(styles),
);
