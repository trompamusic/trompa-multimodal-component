import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import { providers } from '../../utils';
import styles from './SearchTips.styles';

class SearchTips extends Component {
  render() {
    const { t, classes, searchPhrase } = this.props;

    return (
      <div>
        <Typography className={classes.noResultsHeader}>
          {t('emptyResults.noResults', { searchPhrase })}
        </Typography>
        <div>
          <Typography className={classes.searchTipsHeader}>
            {t('searchTips.searchTips')}
          </Typography>
          <ul className={classes.searchTips}>
            <li>{t('searchTips.tryOtherFilter')}</li>
            <li>{t('searchTips.doubleCheck')}</li>
            <li>{t('searchTips.tryAnother')}</li>
            <li>{t('searchTips.lessSpecific')}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default providers(
  SearchTips,
  withTranslation('searchResults'),
  withStyles(styles),
);
