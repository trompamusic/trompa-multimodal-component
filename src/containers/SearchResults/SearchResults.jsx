import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import styles from './SearchResults.styles';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider';
import SearchResultPerson from '../../components/SearchResultPerson';
import SearchResultComposition from '../../components/SearchResultComposition';
import SearchFilters from '../SearchFilters';
import SearchResultScore from '../../components/SearchResultScore';
import SearchResultVideo from '../../components/SearchResultVideo';

const resultsDict = {
  Person          : SearchResultPerson,
  MusicComposition: SearchResultComposition,
  DigitalDocument : SearchResultScore,
  VideoObject     : SearchResultVideo,
};

class SearchResults extends Component {
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  filterResults = (type) => {
    const { data: { searchMetadataText } } = this.props;

    const filteredResult = searchMetadataText ? searchMetadataText.filter(({ __typename }) => __typename === type) : [];

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

  renderResult(typeName, selectedCategory, counts) {
    const Component = resultsDict[typeName];
    const moreResults = ['VideoObject']
    console.log(typeName)
    console.log('is it in there?:', moreResults.includes(typeName))

    if (selectedCategory === 'all' || selectedCategory === typeName) {
      this.scrollToTop();
      return (
        <Component 
          count={counts[typeName] || 0} 
          data={selectedCategory === 'all' ? (
            (moreResults.includes(typeName) ? this.filterResults(typeName).slice(0, 4) : this.filterResults(typeName).slice(0, 3)) 
          ) : this.filterResults(typeName)} />
        )
    }

    return null;
  }

  renderResults(selectedCategory, counts){
    return (
      <React.Fragment>
        {this.renderResult('Person', selectedCategory, counts)}
        {this.renderResult('MusicComposition', selectedCategory, counts)}
        {this.renderResult('DigitalDocument', selectedCategory, counts)}
        {this.renderResult('VideoObject', selectedCategory, counts)}
      </React.Fragment>
    )
  }

  renderNoResults(searchPhrase) {
    const { classes, t } = this.props;

    return (
      <div className={classes.noResults}>
        <Typography className={classes.noResultsHeader}>
          We're sorry! We couldn't finds results for "{searchPhrase}"
        </Typography>
        <div>
          <Typography className={classes.searchTipsHeader}>
            {t('searchTips.searchTips')}:
          </Typography>
          <ul className={classes.searchTips}>
            <li>{t('searchTips.doubleCheck')}</li>
            <li>{t('searchTips.tryAnother')}</li>
            <li>{t('searchTips.lessSpecific')}</li>
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const { t, data: { searchMetadataText }, classes } = this.props;
    const counts = this.renderResultCountPerType(searchMetadataText)

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, selectedCategory }) => (
          <Grid className={classes.root}>
            <Grid xs={12} md={2} item>
              <SearchFilters data={searchMetadataText} />
            </Grid>
            <Grid xs={12} md={10} item className={classes.resultsContainer}>
              <Typography variant="subtitle1" className={classes.resultsTotal}>{searchMetadataText ? searchMetadataText.length : 0} {t('results')}</Typography>
              {this.renderResults(selectedCategory, counts)}
              {searchMetadataText && searchMetadataText.length === 0 && selectedCategory === 'all' ? (
                this.renderNoResults(searchPhrase)
              ) : null}
            </Grid>
          </Grid>
        )}
      </SearchContext.Consumer>
      );
    }
  }

export const SEARCH_QUERY = gql`
    query ($searchPhrase: String!, $categories: [MetadataInterfaceType]) {
      searchMetadataText(
        substring: $searchPhrase,
        onTypes: $categories
    ) {
        __typename
        ... on Person {
          identifier
          name
          jobTitle
          description
          image
          source
        }

        ... on MusicComposition {
          identifier
          name
          creator
          image
          source
        }

        ... on DigitalDocument {
          identifier
          name
          creator
          source
          version
          publisher
        }

        ... on VideoObject {
          identifier
          name
          url
          description
          duration
          image
          source
        }
    }
  }
`;

export default providers(
  SearchResults,
  graphql(SEARCH_QUERY, {
    options: props => ({
      variables: {
        searchPhrase: props.searchPhrase,
        categories: props.categories,
      },
    }),
  }),
  withTranslation('searchResults'),
  withStyles(styles),
  withRouter,
);
