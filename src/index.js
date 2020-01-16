import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MuiThemeProvider } from '@material-ui/core';
import SearchProvider from './containers/SearchProvider';
import { Search } from './containers/Search';
import theme from './theme';
import i18n from './i18n';

export class MultiModalComponent extends Component {
  static propTypes = {};

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <SearchProvider>
            <Search />
          </SearchProvider>
        </I18nextProvider>
      </MuiThemeProvider>
    );
  }
}
