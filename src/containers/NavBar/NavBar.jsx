import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../../components/SearchBar'
import images from '../../theme/images';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { translate } from 'react-i18next';
import { SearchContext } from '../../components/SearchProvider/SearchProvider';
import styles from './NavBar.styles';
import { providers } from '../../utils';

export class NavBar extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.toolbar} variant="dense">
          <div>
            <Typography variant="h6">
              <Link className={classes.navLink} component={RouterLink} to="/">
                <img className={classes.logo} src={images.logo} alt="logo" />
              </Link>
            </Typography> 
          </div>
          <div className={classes.searchContainer}>
            <SearchContext.Consumer>
              {({ searchPhrase, searchTags, handleSearchSubmit }) => (
                <SearchBar onSubmit={(event, searchPhrase, searchTags) => handleSearchSubmit(event, searchPhrase, searchTags)} />
              )}
            </SearchContext.Consumer>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default providers(
  NavBar,
  translate('navbar'),
  withStyles(styles),
  withRouter,
);
