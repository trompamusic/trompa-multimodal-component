import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
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
        elevation={2}
      >
        <Avatar className={classes.type}>
          {Icon ? <Icon className={classes.typeIcon} /> : null}
          <Typography className={classes.typeText}>
            {t(`types.${type}`)}
          </Typography>
        </Avatar>
        <div className={classes.infoContainer}>
          <div
            className={classNames({
              [classes.info]       : variant === 'default',
              [classes.variantCard]: variant === 'card',
            })}
          >
            <div className={classes.infoMeta}>
              {heading && (
                <Typography className={classes.heading}>
                  {heading}
                </Typography>
              )}
              {title && (
                <Typography className={classes.title}>
                  {title}
                </Typography>
              )}
            </div>
            {source && (
              <Hidden smDown>
                <Link className={classes.resultSource} href={source} target="_blank" color="inherit">
                  <ImageIcon className={classes.sourceIcon} />
                  <Typography className={classes.source}>
                    {getUrlHostName(source)}
                  </Typography>
                </Link>
              </Hidden>
            )}
          </div>
          {body}
          {source && (
            <Hidden mdUp>
              <Link className={classes.resultSource} href={source} target="_blank" color="inherit">
                <ImageIcon className={classes.sourceIcon} />
                <Typography className={classes.source}>
                  {getUrlHostName(source)}
                </Typography>
              </Link>
            </Hidden>
          )}
        </div>
      </Paper>
    );
  }
}

export default withTranslation('searchResults')(withStyles(styles)(SearchResult));
