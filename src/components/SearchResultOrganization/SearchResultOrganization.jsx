import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import styles from './SearchResultOrganization.styles';
import ShowMoreButton from '../../shared/ShowMoreButton';
import translate from 'react-i18next/dist/commonjs/translate';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { SearchContext } from '../../screens/Search/Search';

class SearchResultOrganization extends Component {
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
                  <Typography variant="h5">{t('organization_result.organization')} ({count})</Typography>
                  {selectedCategory === 'all' ? (
                    <ShowMoreButton onClick={event => setCategory(event, "Organization")} />
                  ) : null}
                </div>
                <div className={classes.organizationResultsContainer}>
                  {data && data.map(({ identifier, name, description, image, source }) => (
                    <Paper key={identifier} className={classes.organizationContainer}>
                      <div className={classes.organizationHeader}>
                        <Fragment>
                          {image ? (
                            <Avatar className={classes.image} src={image} alt="Organization thumbnail" />
                          ) : <Avatar className={classes.image} />}
                        </Fragment>
                        <div className={classes.organizationInfo}>
                          <Typography variant="h5" className={classes.name}>
                            {name ? name : t('empty_results.no_title')}
                          </Typography>
                          <Typography variant="subtitle2">
                            {source ? <Link href={source} target="_blank">{source}</Link> : t('empty_results.no_source')}
                          </Typography>
                          <Typography paragraph className={classes.description}>
                            {description ? this.ellipsis(description, 250) : t('empty_results.no_description')}
                          </Typography>
                        </div>
                      </div>
                    </Paper>
                  ))}
                </div>
              </Fragment>
            ) : null}
            {count === 0 && selectedCategory === 'Organization' ? (
              <Typography className={classes.noResultsText} variant="h4">
                No results for organizations relating to "{searchPhrase}"
              </Typography>
            ) : null}
          </Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default translate('searchResults')(withStyles(styles)(SearchResultOrganization));