import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SearchContext } from '../../containers/SearchProvider/SearchProvider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ShowMoreButton from '../../shared/ShowMoreButton';
import styles from './SearchResultComposition.styles';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { withTranslation } from 'react-i18next';

class SearchResultComposition extends Component {
  ellipsis = (textSource, maxLength) => {
    if (textSource.length >= maxLength) {
      return textSource.substr(0, maxLength) + '...'
    }

    return textSource;
  };
  
  render() {
    const { t, classes, data, count } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, selectedCategory, setCategory }) => (
          <Fragment>
            {count !== 0 ? (
              <Fragment>
                <div className={classes.header}>
                  <Typography variant="h5">{t('composition_result.composition')} ({count})</Typography>
                  {selectedCategory === 'all' ? (
                    <ShowMoreButton onClick={event => setCategory(event, "MusicComposition")} /> 
                  ) : null}
                </div>
                {data && data.map(({ identifier, creator, name, image }) => (
                  <Paper key={identifier} className={classes.compositionContainer}>
                    <Fragment>
                      {image ? (
                        <Avatar className={classes.image} src={image} alt="Person thumbnail" />
                      ) : <Avatar className={classes.image} />}
                    </Fragment>
                    <div className={classes.contentContainer}>
                      <Typography variant="subtitle2">
                        {creator ? creator : t('empty_results.no_creator')}
                      </Typography>
                      <Typography variant="h5">
                        {name ? name : t('empty_results.no_title')}
                      </Typography>
                    </div>
                  </Paper>
                ))}
              </Fragment>
            ) : null}
            {count === 0 && selectedCategory === 'MusicComposition' ? (
              <Typography className={classes.noResultsText} variant="h4">
                No results for compositions relating to "{searchPhrase}"
              </Typography>
            ) : null}
          </Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default withTranslation('searchResults')(withStyles(styles)(SearchResultComposition));