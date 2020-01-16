import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import { getUrlHostName } from '../../utils';
import { SearchContext } from '../../containers/SearchProvider/SearchProvider';
import styles from './SearchResultPerson.styles';

class SearchResultPerson extends Component {
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
        {data && data.map(({ identifier, name, jobTitle, source }) => (
          <Paper 
            key={identifier} 
            className={classes.resultContainer}
            onClick={name => console.log(`${name} clicked!`)}
          >
            <div>
              <Avatar className={classes.image}>
                <AccountCircleIcon className={classes.typeIcon} />
                <Typography className={classes.typeText}>
                  {t('personResult.person')}
                </Typography>
              </Avatar>
            </div>
            <div className={classes.infoContainer}>
              <div className={classes.infoHeader}>
                <Typography className={classes.resultRole}>
                  {jobTitle ? jobTitle : t('emptyResults.noRole')}
                </Typography>
                <Hidden smDown>
                  <div className={classes.resultSource}>
                    <ImageIcon className={classes.sourceIcon} />
                    <Typography className={classes.source}>
                      {source ? getUrlHostName(source)  : null}
                    </Typography>
                  </div>
                </Hidden>
              </div>
              <Typography className={classes.resultName}>
                {name ? name : t('emptyResults.noName')}
              </Typography>
              <Hidden mdUp>
                <div className={classes.resultSource}>
                  <ImageIcon className={classes.sourceIcon} />
                  <Typography className={classes.source}>
                    {source ? getUrlHostName(source)  : null}
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
                  {t('personResult.people')}
                  <span className={classes.resultsCount}>({count})</span>
                </Typography>
                {this.renderResults(data)}
                {selectedCategory === 'all' && count > 3 ? (
                  <Button
                    className={classes.button} 
                    onClick={event => setCategory(event, "Person")}
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

export default withTranslation('searchResults')(withStyles(styles)(SearchResultPerson));