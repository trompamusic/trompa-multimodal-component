import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import images from '../../theme/images';
import { withRouter, Link as Routerlink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { translate } from 'react-i18next';
import styles from './NavBar.styles';
import { providers } from '../../utils';

class NavBar extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar className={classes.toolbar} variant="dense">
            <Typography variant="h6">
              <Link className={classes.navLink} component={Routerlink} to="/" exact>
                <img className={classes.logo} src={images.logo} width="100" alt="logo" />
              </Link>
            </Typography> 
            <Typography variant="h6">
              <Link className={classes.navLink} component={Routerlink} to="/" exact>
                <SearchIcon />
              </Link> 
            </Typography>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default providers(
  NavBar,
  translate('navbar'),
  withStyles(styles),
  withRouter,
);
