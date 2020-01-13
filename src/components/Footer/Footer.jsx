import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './Footer.styles';

class Footer extends Component {
  render() {
    const { classes, t } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <div className={classes.footer}>
            <Typography
              color="inherit"
              className={classes.footerCopyright}
            >{t('copyright')}
            </Typography>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation('footer')(withStyles(styles)(Footer));
