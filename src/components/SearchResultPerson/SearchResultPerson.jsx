import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { SearchContext } from '../../screens/Search/Search'
import styles from './SearchResultPerson.styles';
import translate from 'react-i18next/dist/commonjs/translate';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ShowMoreButton from '../../shared/ShowMoreButton';

class SearchResultPerson extends Component {
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
                    {selectedCategory === 'all' ?
                      <ShowMoreButton onClick={event => setCategory(event, "Person")} />
                      : null}
                  </div>
                  {data && data.map(({ identifier, name, description, image, jobTitle }) => (
                    <Paper key={identifier} className={classes.personContainer}>
                      <div className={classes.personHeader}>
                        <Fragment>
                          {image ? (
                            <Avatar src={image} alt="Person thumbnail" />
                          ) : (
                              <Avatar />
                            )}
                        </Fragment>
                        <div className={classes.personInfo}>
                          <Typography variant="h5" className={classes.name}>{name}</Typography>
                          <Typography variant="subtitle1" className={jobTitle}>
                            {jobTitle ? jobTitle : 'No job title'}
                          </Typography>
                          <Typography paragraph className={classes.description}>
                            {description ? description.substr(0, 250) + (description.length >= 250 ? '...' : '') : 'No description.'}
                          </Typography>
                        </div>
                      </div>
                      <Typography paragraph className={classes.links}>
                        Description (x) &bull; Compositions (x) &bull; Scores (x) &bull; Annotations (x)
                      </Typography>
                    </Paper>
                  ))}
                </Fragment>
              </Fragment>
            ) : null}
            {count === 0 && selectedCategory === 'Person'
              ? <Typography variant="h4">
                  No results for people relating to "{searchPhrase}"
                </Typography>
              : null
            }
          </Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default translate('searchResults')(withStyles(styles)(SearchResultPerson));