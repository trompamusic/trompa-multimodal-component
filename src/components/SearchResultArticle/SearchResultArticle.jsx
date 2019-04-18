import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SearchContext } from '../../screens/Search/Search'
import Paper from '@material-ui/core/Paper';
import ShowMoreButton from '../../shared/ShowMoreButton';
import Typography from '@material-ui/core/Typography';
import styles from './SearchResultArticle.styles';
import translate from 'react-i18next/dist/commonjs/translate';
import Avatar from '@material-ui/core/Avatar/Avatar';

class SearchResultArticle extends Component {
  render() {
    const { t, classes, data, count } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, selectedCategory, setCategory }) => (
          <Fragment>
            {count !== 0 ? (
              <Fragment>
                <div className={classes.header}>
                  <Typography variant="h5">{t('article_result.article')} ({count})</Typography>
                  {selectedCategory === 'all' ?
                    <ShowMoreButton onClick={event => setCategory(event, "Article")} /> : null}
                </div>
                <div className={classes.articleResultsContainer}>
                  {data && data.map(({ identifier, name, description, image }) => (
                    <Paper key={identifier} className={classes.articleContainer}>
                      <div className={classes.articleHeader}>
                        <Fragment>
                          {image 
                            ? <Avatar className={classes.image} src={image} alt="Article thumbnail" />
                            : <Avatar className={classes.image} />
                          }
                        </Fragment>
                        <div className={classes.contentContainer}>
                          <Typography variant="h5">{name}</Typography>
                          <Typography variant="subtitle1">Unknown date</Typography>
                          <Typography paragraph className={classes.description}>
                            {description ? description.substr(0, 250) + (description.length >= 250 ? '...' : '') : 'No description.'}
                          </Typography>
                        </div>
                      </div>
                    </Paper>
                  ))}
                </div>
              </Fragment>
            ) : null}
            {count === 0 && selectedCategory === 'Article'
              ? <Typography variant="h4">No results for articles relating to "{searchPhrase}"</Typography>
              : null
            }
          </Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default translate('searchResults')(withStyles(styles)(SearchResultArticle));

