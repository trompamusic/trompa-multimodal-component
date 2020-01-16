import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import Avatar from '@material-ui/core/Avatar';
import { SearchContext } from '../../containers/SearchProvider/SearchProvider';
import { getUrlHostName } from '../../utils';
import styles from './SearchResultVideo.styles';

class SearchResultVideo extends Component {
  ellipsis = (textSource, maxLength) => {
    if (textSource.length >= maxLength) {
      return textSource.substr(0, maxLength) + '...'
    }

    return textSource;
  };

  renderResults = (data) => {
    const { classes, t } = this.props;

    return (
      <div className={classes.results}>
        {data && data.map(({ identifier, name, source }) => (
          <Paper 
            key={identifier} 
            className={classes.resultContainer} 
            onClick={name => console.log(`${name} clicked!`)}
          >
            <div>
              <Avatar className={classes.image}>
                <VideocamIcon className={classes.typeIcon} />
                <Typography className={classes.typeText}>
                  {t('videoResult.video')}
                </Typography>
              </Avatar>
            </div>
            <div className={classes.infoContainer}>
              <Typography className={classes.resultName}>
                {name ? name : t('emptyResults.noName')}
              </Typography>
              <div className={classes.infoHeader}>
                <Hidden smDown>
                  <div className={classes.resultSource}>
                    <ImageIcon className={classes.sourceIcon} />
                    <Typography className={classes.source}>
                      {source ? getUrlHostName(source) : null}
                    </Typography>
                  </div>
                </Hidden>
              </div>
              <Hidden mdUp>
                <div className={classes.resultSource}>
                  <ImageIcon className={classes.sourceIcon} />
                  <Typography className={classes.source}>
                    {source ? getUrlHostName(source) : null}
                  </Typography>
                </div>
              </Hidden>
            </div>
          </Paper>
        ))}
      </div>
    )
  }

  render() {
    const { t, classes, data, count } = this.props;

    return (
      <SearchContext.Consumer>
        {({ selectedCategory, setCategory }) => (
          <div className={classes.root}>
            {count > 0 ? (
              <div className={classes.root}>
                <Typography className={classes.header}>
                  {t('videoResult.videos')}
                  <span className={classes.resultsCount}>({count})</span>
                </Typography>
                {this.renderResults(data)}
                {selectedCategory === 'all' && count > 4 ? (
                  <Button
                    className={classes.button} 
                    onClick={event => setCategory(event, "VideoObject")}
                  >
                    {t('showMore')}<ChevronRightIcon className={classes.buttonIcon} />
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </SearchContext.Consumer>
    )
  }
}

export default withTranslation('searchResults')(withStyles(styles)(SearchResultVideo));