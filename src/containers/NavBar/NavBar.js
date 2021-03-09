import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import images from '../../theme/images';
import { SearchContext } from '../SearchProvider/SearchProvider';
import { providers } from '../../utils';
import LanguageSelect from '../../components/LanguageSelect';
import styles from './NavBar.styles';

export class NavBar extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const { classes, placeholderText, t } = this.props;

    let searchPlaceholderText = placeholderText;

    // make the placeholderText prop backwards compatible. If given, use it.
    if (!searchPlaceholderText) {
      searchPlaceholderText = t('placeholder_text');
    }

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.toolbar} variant="dense">
          <div className={classes.headerContainer}>
            <Typography variant="h6">
              <img className={classes.logo} src={images.logo} alt="logo" />
            </Typography>
            <LanguageSelect
              languages={[
                'en-US',
                'nl-NL',
              ]}
            />
          </div>
          <div className={classes.searchContainer}>
            <SearchContext.Consumer>
              {({ search }) => (
                <SearchBar placeholderText={searchPlaceholderText} onSubmit={(event, searchPhrase, searchTags) => search(searchPhrase, searchTags)} />
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
  withTranslation('searchBar'),
  withStyles(styles),
);
