import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography'
import { providers } from '../../utils'
import { SearchContext } from '../SearchProvider/SearchProvider'
import SearchResultPerson from '../../components/SearchResultPerson'
import SearchResultComposition from '../../components/SearchResultComposition'
import SearchFilters from '../SearchFilters'
import SearchResultScore from '../../components/SearchResultScore'
import SearchResultVideo from '../../components/SearchResultVideo'
import styles from './SearchResults.styles'

const resultsDict = {
  Person: SearchResultPerson,
  MusicComposition: SearchResultComposition,
  DigitalDocument: SearchResultScore,
  VideoObject: SearchResultVideo
}

class SearchResults extends Component {
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  filterResults = (type, searchResults) => {
    const filteredResult = searchResults ? searchResults.filter(({ __typename }) => __typename === type) : []

    return filteredResult
  };

  renderResultCountPerType = (data) => {
    return (data || []).reduce((acc, value) => {
      if (typeof acc[value.__typename] === 'undefined') {
        acc[value.__typename] = data.filter(({ __typename }) => __typename === value.__typename).length
      }

      return acc
    }, {})
  };

  renderResult(typeName, selectedCategory, counts, searchResults) {
    const Component = resultsDict[typeName]
    const moreResults = ['VideoObject']

    if (selectedCategory === 'all' || selectedCategory === typeName) {
      this.scrollToTop()
      return (
        <Component
          count={counts[typeName] || 0}
          data={selectedCategory === 'all' ? (
            (moreResults.includes(typeName) ? this.filterResults(typeName, searchResults).slice(0, 4) : this.filterResults(typeName, searchResults).slice(0, 3))
          ) : this.filterResults(typeName, searchResults)} />
      )
    }

    return null
  }

  renderResults(selectedCategory, counts, searchResults) {
    return (
      <React.Fragment>
        {this.renderResult('Person', selectedCategory, counts)}
        {this.renderResult('MusicComposition', selectedCategory, counts)}
        {this.renderResult('DigitalDocument', selectedCategory, counts)}
        {this.renderResult('VideoObject', selectedCategory, counts)}
      </React.Fragment>
    )
  }

  renderNoResults(searchPhrase, selectedCategory) {
    const { classes, t } = this.props

    const types = {
      Person: t('personResult.personLower'),
      MusicComposition: t('compositionResult.compositionLower'),
      DigitalDocument: t('scoreResult.scoreLower'),
      VideoObject: t('videoResult.videoLower')
    }

    return (
      <div className={classes.noResults}>
        <Typography className={classes.noResultsHeader}>
          {selectedCategory === 'all' ? (t('emptyResults.noResults', { searchPhrase })) : (
            t('emptyResults.noResultsCategory', { type: types[selectedCategory], searchPhrase })
          )}:
        </Typography>
        <div>
          <Typography className={classes.searchTipsHeader}>
            {t('searchTips.searchTips')}
          </Typography>
          <ul className={classes.searchTips}>
            {selectedCategory !== 'all' ? (
              <li>{t('searchTips.tryOtherFilter')}</li>
            ) : null}
            <li>{t('searchTips.doubleCheck')}</li>
            <li>{t('searchTips.tryAnother')}</li>
            <li>{t('searchTips.lessSpecific')}</li>
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const { t, classes } = this.props

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, selectedCategory, searchResults }) => (
          <Grid className={classes.root}>
            <Grid xs={12} md={2} item>
              <SearchFilters data={searchResults} />
            </Grid>
            <Grid xs={12} md={10} item className={classes.resultsContainer}>
              <Typography variant='subtitle1' className={classes.resultsTotal}>{searchResults ? searchResults.length : 0} {t('results')}</Typography>
              {this.renderResults(selectedCategory, counts)}
              {searchMetadataText && searchMetadataText.length === 0 ? (
                this.renderNoResults(searchPhrase, selectedCategory)
              ) : null}
            </Grid>
          </Grid>
        )}
      </SearchContext.Consumer>
    )
  }
}

export default providers(
  SearchResults,
  withTranslation('searchResults'),
  withStyles(styles)
)
