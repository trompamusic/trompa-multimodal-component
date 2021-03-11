import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withTranslation } from 'react-i18next';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import VideoCamIcon from '@material-ui/icons/Videocam';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { providers, debounce } from '../../utils';
import SearchResult from '../../components/SearchResult';
import SearchTips from '../../components/SearchTips';
import styles from './SearchResults.styles';

class SearchResults extends Component {
  state = {
    isSearching   : false,
    showLoading   : false,
    debouncePeriod: 1500,
  };

  componentDidUpdate(prevProps, prevState) {
    const hasPreviousResults = prevProps.searchResults.length > 0;
    const hasCurrentResults  = this.props.searchResults.length > 0;

    if (!prevState.isSearching && hasPreviousResults && !hasCurrentResults) {
      this.setState({ isSearching: true });
      this.setState({ showLoading: true });
      this.debounceSearchTips();
    }

    if (prevState.isSearching && !hasPreviousResults && !hasCurrentResults) {
      this.debounceSearchTips();
    }
  }

  debounceSearchTips = debounce(() => {
    this.setState({ showLoading: false });
    this.setState({ isSearching: false });
  }, this.state.debouncePeriod);

  renderTypeResult(typeName, item) {
    const { onResultClick, renderSearchResult, t } = this.props;

    if (typeof renderSearchResult === 'function') {
      return renderSearchResult(typeName, item, onResultClick);
    }

    switch (typeName) {
    case 'Person':
      return (
        <SearchResult
          icon={AccountCircleIcon}
          variant="default"
          type={typeName}
          heading={item.subject || item.jobTitle || t('emptyResults.noRole')}
          title={item.title || item.name}
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
          title={item.title || item.name}
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
          title={item.title || item.name}
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
          title={item.title || item.name}
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
          title={item.title || item.name}
          source={item.source}
          onClick={() => onResultClick(item)}
        />
      );
    default:
      return (
        <SearchResult
          variant="default"
          type={typeName}
          title={item.title || item.name}
          source={item.source}
          onClick={() => onResultClick(item)}
        />
      );
    }
  }

  render() {
    const { t, classes, total, loading, searchResults, searchPhrase, renderResult } = this.props;

    if (searchResults.length === 0 && !this.state.showLoading && !loading) {
      return <SearchTips searchPhrase={searchPhrase} />;
    }

    return (
      <>
        <Typography
          variant="subtitle1"
          className={classes.resultsTotal}
        >
          {t('results', { count: total })}
        </Typography>
        <div style={{ marginBottom: 16 }}>
          {(loading || this.state.showLoading) ? (
            <div className={classes.loading}>
              <CircularProgress className={classes.spinner} size={45} />
            </div>
          ) : null}
          <Grid spacing={1} container>
            {searchResults.map(item => (
              <Grid key={item.identifier} xs={12} sm={12} item>
                {this.renderTypeResult(item.__typename, item, renderResult)}
              </Grid>
            ))}
          </Grid>
        </div>
      </>
    );
  }
}

export default providers(
  SearchResults,
  withTranslation('searchResults'),
  withStyles(styles),
);
