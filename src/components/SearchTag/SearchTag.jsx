import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import styles from './SearchTag.styles';

class SearchTag extends Component {
  render() {
    const { classes, term, onClickRemove } = this.props;

    return (
      <div className={classes.root}>
        <Typography
          className={classes.term}
        >
          {term}
        </Typography>
        <CancelIcon className={classes.icon} onClick={(event) => onClickRemove(event, term)} />
      </div>
    );
  }
}

export default withStyles(styles)(SearchTag);
