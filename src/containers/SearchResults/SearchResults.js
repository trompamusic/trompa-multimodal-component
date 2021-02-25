import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import VideoCamIcon from '@material-ui/icons/Videocam';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider';
import SearchFilters from '../SearchFilters';
import SearchResult from '../../components/SearchResult';
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

  renderResults(searchResults, counts, renderResult) {
    return (
      <div style={{ marginBottom: 16 }}>
        <Grid spacing={1} container>
          {searchResults.map((item, index) => (
            <Grid data-test-id={index === 0 ? 'first-search-result' : null} key={item.identifier} xs={12} sm={12} item>
              {this.renderTypeResult(item.__typename, item, renderResult)}
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  renderNoResults(searchPhrase) {
    const { classes, t } = this.props;

    return (
      <div className={classes.noResults}>
        <Typography className={classes.noResultsHeader}>
          {t('emptyResults.noResults', { searchPhrase })}
        </Typography>
        <div>
          <Typography className={classes.searchTipsHeader}>
            {t('searchTips.searchTips')}
          </Typography>
          <ul className={classes.searchTips}>
            <li>{t('searchTips.tryOtherFilter')}</li>
            <li>{t('searchTips.doubleCheck')}</li>
            <li>{t('searchTips.tryAnother')}</li>
            <li>{t('searchTips.lessSpecific')}</li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { t, classes } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, searchResults, counts, total, allTotal, loading }) => (
          <Grid className={classes.root}>
            <Grid xs={12} md={3} item>
              <SearchFilters />
            </Grid>
            <Grid xs={12} md={9} className={classes.resultsContainer} item>
              <Typography
                variant="subtitle1"
                className={classes.resultsTotal}
              >
                {t('results', { count: total })}
              </Typography>
              {this.renderResults(searchResults, counts)}
              {total === 0 && !loading ? (
                this.renderNoResults(searchPhrase, '')
              ) : null}
            </Grid>
          </Grid>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default providers(
  SearchResults,
  withTranslation('searchResults'),
  withStyles(styles),
);
