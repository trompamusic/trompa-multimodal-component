import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { SearchContext } from '../../components/SearchProvider/SearchProvider';
import styles from './SearchResultPerson.styles';
import translate from 'react-i18next/dist/commonjs/translate';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ShowMoreButton from '../../shared/ShowMoreButton';

class SearchResultPerson extends Component {
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
                <Fragment>
                  <div className={classes.header}>
                    <Typography variant="h5">{t('person_result.people')} ({count})</Typography>
                    {selectedCategory === 'all' ? (
                      <ShowMoreButton onClick={event => setCategory(event, "Person")} />
                    ) : null}
                  </div>
                  {data && data.map(({ identifier, name, description, image, jobTitle }) => (
                    <Paper key={identifier} className={classes.personContainer}>
                      <div className={classes.personHeader}>
                        <Fragment>
                          {image ? (
                            <Avatar src={image} className={classes.image} alt="Person thumbnail" />
                          ) : <Avatar className={classes.image} />}
                        </Fragment>
                        <div className={classes.personInfo}>
                          <Typography variant="h5" className={classes.name}>
                            {name ? name : t('empty_results.no_title')}
                          </Typography>
                          <Typography variant="subtitle1" className={jobTitle}>
                            {jobTitle ? jobTitle : t('empty_results.no_job_title')}
                          </Typography>
                          <Typography paragraph className={classes.description}>
                            {description ? this.ellipsis(description, 250) : t('empty_results.no_description')}
                          </Typography>
                        </div>
                      </div>
                    </Paper>
                  ))}
                </Fragment>
              </Fragment>
            ) : null}
            {count === 0 && selectedCategory === 'Person' ? (
              <Typography className={classes.noResultsText} variant="h4">No results for people relating to "{searchPhrase}"</Typography>
            ) : null}
          </Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default translate('searchResults')(withStyles(styles)(SearchResultPerson));