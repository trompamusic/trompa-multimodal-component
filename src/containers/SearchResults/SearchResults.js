import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider';
import SearchResultPerson from '../../components/SearchResultPerson';
import SearchResultComposition from '../../components/SearchResultComposition';
import SearchResultArticle from '../../components/SearchResultArticle';
import SearchFilters from '../SearchFilters';
import SearchResultOrganization from '../../components/SearchResultOrganization';
import SearchResultProduct from '../../components/SearchResultProduct';
import SearchResultPlace from '../../components/SearchResultPlace';
import SearchResultVideo from '../../components/SearchResultVideo';
import styles from './SearchResults.styles';

const resultsDict = {
  Person          : SearchResultPerson,
  MusicComposition: SearchResultComposition,
  VideoObject     : SearchResultVideo,
  Article         : SearchResultArticle,
  Organization    : SearchResultOrganization,
  Product         : SearchResultProduct,
  Place           : SearchResultPlace,
};

class SearchResults extends Component {
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  filterResults = (type, searchResults) => {
    const filteredResult = searchResults ? searchResults.filter(({ __typename }) => __typename === type) : [];

    return filteredResult;
  };

  renderResultCountPerType = (data) => {
    return (data || []).reduce((acc, value) => {
      if (typeof acc[value.__typename] === 'undefined') {
        acc[value.__typename] = data.filter(({ __typename }) => __typename === value.__typename).length;
      }

      return acc;
    }, {});
  };

  renderResult(typeName, selectedCategory, counts, searchResults) {
    const Component = resultsDict[typeName];

    if (selectedCategory === 'all' || selectedCategory === typeName) {
      this.scrollToTop();
      return (
        <Component
          count={counts[typeName] || 0}
          data={selectedCategory === 'all' ? (
            this.filterResults(typeName, searchResults).slice(0, 3)
          ) : this.filterResults(typeName, searchResults)} />
        )
    }

    return null;
  }

  renderResults(selectedCategory, counts, searchResults){
    return (
      <React.Fragment>
        {this.renderResult('Person', selectedCategory, counts, searchResults)}
        {this.renderResult('MusicComposition', selectedCategory, counts, searchResults)}
        {this.renderResult('VideoObject', selectedCategory, counts, searchResults)}
        {this.renderResult('Article', selectedCategory, counts, searchResults)}
        {this.renderResult('Organization', selectedCategory, counts, searchResults)}
        {this.renderResult('Product', selectedCategory, counts, searchResults)}
        {this.renderResult('Place', selectedCategory, counts, searchResults)}
      </React.Fragment>
    )
  }

  render() {
    const { t, classes } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, selectedCategory, searchResults }) => (
          <Grid className={classes.root}>
            <Grid xs={12} md={2} item>
              <SearchFilters data={searchResults} />
            </Grid>
            <Grid xs={12} md={10} item className={classes.resultsContainer}>
              <div className={classes.resultsHeader}>
                <Typography className={classes.resultsTotal}>
                  {searchResults ? searchResults.length : 0} {t('results')}
                </Typography>
              </div>
              {this.renderResults(selectedCategory, this.renderResultCountPerType(searchResults), searchResults)}
              {searchResults && searchResults.length === 0 && selectedCategory === 'all' ? (
                <Typography className={classes.noResultsText} variant="h4">
                  No results relating to "{searchPhrase}"
                </Typography>
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
