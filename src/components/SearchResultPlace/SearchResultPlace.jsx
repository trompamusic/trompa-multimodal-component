import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SearchContext } from '../../components/SearchProvider/SearchProvider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ShowMoreButton from '../../shared/ShowMoreButton';
import styles from './SearchResultPlace.styles';
import translate from 'react-i18next/dist/commonjs/translate';
import Avatar from '@material-ui/core/Avatar/Avatar';

class SearchResultPlace extends Component {
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
                  <Typography variant="h5">{t('place_result.place')} ({count})</Typography>
                  {selectedCategory === 'all' ? (
                    <ShowMoreButton onClick={event => setCategory(event, "Place")} />
                  ) : null}
                </div>
                <div className={classes.placeResultsContainer}>
                  {data && data.map(({ identifier, description, source, name, image }) => (
                    <Paper key={identifier} className={classes.placeContainer}>
                      <Fragment>
                        {image ? (
                          <Avatar className={classes.image} src={image} alt="Person thumbnail" />
                        ) : <Avatar className={classes.image} />}
                      </Fragment>
                      <div className={classes.contentContainer}>
                          <Typography variant="h5" className={classes.name}>{name}</Typography>
                          <Typography variant="subtitle2">
                            {source ? <Link href={source} target="_blank">{source}</Link> : t('empty_results.no_source')}
                          </Typography>
                          <Typography paragraph className={classes.description}>
                            {description ? this.ellipsis(description, 100) : t('empty_results.no_description')}
                          </Typography>
                      </div>
                    </Paper>
                  ))}
                </div>
              </Fragment>
            ) : null}
            {count === 0 && selectedCategory === 'Place' ? (
              <Typography className={classes.noResultsText} variant="h4">
                No results for places relating to "{searchPhrase}"
              </Typography>
            ) : null}
          </Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default translate('searchResults')(withStyles(styles)(SearchResultPlace));