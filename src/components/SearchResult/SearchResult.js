import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import { getUrlHostName } from '../../utils';
import styles from './SearchResult.styles';

class SearchResult extends Component {
  render() {
    const { classes, variant, type, heading, title, body, source, onClick, icon: Icon, t } = this.props;

    const rootClassName = classNames(classes.root, {
      [classes.variantDefault]: variant === 'default',
      [classes.variantCard]   : variant === 'card',
    });

    return (
      <Paper
        className={rootClassName}
        onClick={onClick}
      >
        <Avatar className={classes.type}>
          {Icon ? <Icon className={classes.typeIcon} /> : null}
          <Typography className={classes.typeText}>
            {t(`types.${type}`)}
          </Typography>
        </Avatar>
        <div className={classes.infoContainer}>
          <div className={classes.info}>
            <div className={classes.infoMeta}>
              {heading && (
                <Typography>
                  {heading}
                </Typography>
              )}
              {title && (
                <Typography>
                  {title}
                </Typography>
              )}
            </div>
            <Hidden smDown>
              <div className={classes.resultSource}>
                <ImageIcon className={classes.sourceIcon} />
                <Typography className={classes.source}>
                  {getUrlHostName(source)}
                </Typography>
              </div>
            </Hidden>
          </div>
          {body}
          {source && (
            <Hidden mdUp>
              <div className={classes.resultSource}>
                <ImageIcon className={classes.sourceIcon} />
                <Typography className={classes.source}>
                  {getUrlHostName(source)}
                </Typography>
              </div>
            </Hidden>
          )}
        </div>
      </Paper>
    );
  }
}

export default withTranslation('searchResults')(withStyles(styles)(SearchResult));
