import React, { Component, Fragment } from 'react';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './ShowMoreButton.styles';

class ShowMoreButton extends Component {
  static propTypes = {
    
  };

  static defaultProps = {
    
  };

  render() {
    const { onClick, classes } = this.props;

    return (
      <Fragment>
        <Button 
          onClick={onClick} 
          className={classes.button}
          size="small"
        >
          Show more <KeyboardArrowRight />
        </Button>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ShowMoreButton);
