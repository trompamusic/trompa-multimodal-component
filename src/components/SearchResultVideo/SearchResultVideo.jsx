import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Link from '@material-ui/core/Link';
import { SearchContext } from '../../screens/Search/Search'
import styles from './SearchResultVideo.styles';
import translate from 'react-i18next/dist/commonjs/translate';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ShowMoreButton from '../../shared/ShowMoreButton';

class SearchResultVideo extends Component {
  render() {
    const { t, classes, data, count } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, selectedCategory, setCategory }) => (
          <Fragment>
            {count !== 0 ? (
              <Fragment>
                <div className={classes.header}>
                  <Typography variant="h5">{t('video_result.video')} ({count})</Typography>
                  {selectedCategory === 'all' ?
                    <ShowMoreButton onClick={event => setCategory(event, "VideoObject")} />
                    : null}
                </div>
                <div className={classes.videoResultsContainer}>
                  {data && data.map(({ identifier, name, description, duration, url, image }) => (
                    <Paper key={identifier} className={classes.videoContainer}>
                      <Fragment>
                        {image ? (
                          <Fragment>
                            <Avatar className={classes.image} src={image} alt="Video thumbnail" />
                            <PlayArrow className={classes.playArrow} />
                          </Fragment>
                        ) : (
                            <Fragment>
                              <Avatar className={classes.image} alt="Video thumbnail" />
                              <PlayArrow className={classes.playArrow} />
                            </Fragment>
                          )
                        }
                      </Fragment>
                      <div className={classes.contentContainer}>
                        <Typography variant="h5" className={classes.name}>{name}</Typography>
                        <Typography variant="subtitle1">
                          {url ? <Link href={url} target="_blank">{url}</Link> : 'No source'}
                        </Typography>
                        <Typography paragraph className={classes.description}>
                          Duration - {duration ? duration : 'unknown'}: {description ? description.substr(0, 100) + (description.length >= 100 ? '...' : '') : 'No description.'}
                        </Typography>
                      </div>
                    </Paper>
                  ))}
                </div>
              </Fragment>
            ) : null}
            {count === 0 && selectedCategory === 'VideoObject'
              ? <Typography variant="h4">
                  No results for videos relating to "{searchPhrase}"
                </Typography>
              : null
            }
          </Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default translate('searchResults')(withStyles(styles)(SearchResultVideo));
