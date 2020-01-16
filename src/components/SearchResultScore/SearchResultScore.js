import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ImageIcon from '@material-ui/icons/Image';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import Avatar from '@material-ui/core/Avatar';
import { SearchContext } from '../../containers/SearchProvider/SearchProvider';
import { getUrlHostName } from '../../utils';
import styles from './SearchResultScore.styles';

class SearchResultScore extends Component {
  ellipsis = (textSource, maxLength) => {
    if (textSource.length >= maxLength) {
      return textSource.substr(0, maxLength) + '...';
    }

    return textSource;
  };

  renderResults = data => {
    const { classes, t } = this.props;

    return (
      <div className={classes.results}>
        {data && data.map(({ identifier, name, creator, source, version, publisher }) => (
          <Paper 
            key={identifier} 
            className={classes.resultContainer}
            onClick={name => console.log(`${name} clicked!`)}
          >
            <div>
              <Avatar className={classes.image}>
                <LibraryMusicIcon className={classes.typeIcon} />
                <Typography className={classes.typeText}>
                  {t('scoreResult.score')}
                </Typography>
              </Avatar>
            </div>
            <div className={classes.infoContainer}>
              <div className={classes.infoHeader}>
                <Hidden smDown>
                  <Typography className={classes.resultRole}>
                    {creator ? creator : t('emptyResults.noComposer')} &#8226; {name ? name : t('emptyResults.noName')}
                  </Typography>
                </Hidden>
                <Hidden mdUp>
                  <div className={classes.mobileHeader}>
                    <Typography className={classes.resultRole}>
                      {creator ? creator : t('emptyResults.noComposer')} &#8226;
                    </Typography>
                    <Typography className={classes.resultRole}>
                      {name ? name : t('emptyResults.noName')}
                    </Typography>
                  </div>
                </Hidden>
                <Hidden smDown>
                  <div className={classes.resultSource}>
                    <ImageIcon className={classes.sourceIcon} />
                    <Typography className={classes.source}>
                      {source ? getUrlHostName(source) : null}
                    </Typography>
                  </div>
                </Hidden>
              </div>
              <Typography className={classes.resultName}>
                {version ? version : t('emptyResults.noName')}
              </Typography>
              <div className={classes.publisherHeader}>
                <Typography className={classes.publisher}>
                  {t('scoreResult.publisherInfo')}:
                </Typography>
                <Typography>
                  {publisher ? publisher : t('emptyResults.noPublisher')}
                </Typography>
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
    );
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
                  {t('scoreResult.scores')}
                  <span className={classes.resultsCount}>({count})</span>
                </Typography>
                {this.renderResults(data)}
                {selectedCategory === 'all' && count > 3 ? (
                  <Button
                    className={classes.button} 
                    onClick={event => setCategory(event, "DigitalDocument")}
                  >
                    {t('showMore')}<ChevronRightIcon className={classes.buttonIcon} />
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default withTranslation('searchResults')(withStyles(styles)(SearchResultScore));