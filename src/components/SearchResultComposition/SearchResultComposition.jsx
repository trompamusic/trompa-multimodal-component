import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SearchContext } from '../../screens/Search/Search'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ShowMoreButton from '../../shared/ShowMoreButton';
import styles from './SearchResultComposition.styles';
import translate from 'react-i18next/dist/commonjs/translate';
import Avatar from '@material-ui/core/Avatar/Avatar';

class SearchResultComposition extends Component {
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
                  {selectedCategory === 'all' ?
                    <ShowMoreButton onClick={event => setCategory(event, "MusicComposition")} /> : null}
                </div>
                {data && data.map(({ identifier, creator, name, image }) => (
                  <Paper key={identifier} className={classes.compositionContainer}>
                    <Fragment>
                      {image ? (
                        <Avatar className={classes.image} src={image} alt="Person thumbnail" />
                      ) : (
                          <Avatar className={classes.image} />
                        )}
                    </Fragment>
                    <div className={classes.contentContainer}>
                      <Typography variant="subtitle2">{creator}</Typography>
                      <Typography variant="h5">{name}</Typography>
                      <Typography paragraph className={classes.links}>
                        Scores (x) &bull; Performances (x) &bull; Articles (x)
                  </Typography>
                    </div>
                  </Paper>
                ))}
              </Fragment>
            ) : null}
            {count === 0 && selectedCategory === 'MusicComposition'
              ? <Typography variant="h4">
                  No results for compositions relating to "{searchPhrase}"
                </Typography>
              : null
            }
          </Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default translate('searchResults')(withStyles(styles)(SearchResultComposition));