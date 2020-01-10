import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../../components/SearchBar'
import images from '../../theme/images';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withTranslation } from 'react-i18next';
import { SearchContext } from '../../components/SearchProvider/SearchProvider';
import styles from './NavBar.styles';
import { providers } from '../../utils';
import LanguageSelect from '../../components/LanguageSelect';

export class NavBar extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.toolbar} variant="dense">
          <div className={classes.headerContainer}>
            <Typography variant="h6">
              <Link className={classes.navLink} component={RouterLink} to="/">
                <img className={classes.logo} src={images.logo} alt="logo" />
              </Link>
            </Typography> 
            <LanguageSelect 
              languages={[
                'de_DE',
                'en_GB',
                'en_US',
                'fr_FR',
                'lb_LU',
                'nl_BE',
                'nl_NL',
              ]}
            />
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
  withTranslation('navbar'),
  withStyles(styles),
  withRouter,
);
