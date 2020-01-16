import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import styles from './LanguageSelect.styles';
import { MenuItem, ListItemIcon, Menu } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';

class LanguageSelect extends Component {
  state = { 
    selectOpen: false,
    anchorEl  : null,
    country   : this.props.i18n.language,
  };

  handleChange = (country) => {
    this.setState({ country });
    i18next.changeLanguage(country);
    this.setState({ selectOpen: false });
  };

  handleOpen = (event) => {
    this.setState({ selectOpen: true });
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ selectOpen: false });
    this.setState({ anchorEl: null});
  };

  renderOptions = () => {
    const { t, classes, languages } = this.props;

    return (
      <Menu 
        open={this.state.selectOpen}
        anchorEl={this.state.anchorEl}
        onClose={this.handleClose}
        keepMounted
      >
        {languages && languages.map(languageCode => (
          <MenuItem
          onClick={() => this.handleChange(languageCode)}
          selected={this.state.country === languageCode}
          >
            <ListItemIcon className={classes.flagIcon}>
              <img
                src={`${process.env.PUBLIC_URL}/static/media/flags/${languageCode}.svg`}
                width={24}
                height={20}
                alt={t(languageCode)}
              />
            </ListItemIcon>
            <ListItemText className={classes.selectText}>
              {t(languageCode)}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    );
  };

  render() {
    const { t, classes } = this.props;

    return (
      <React.Fragment>
        <MenuItem className={classes.select} onClick={this.handleOpen}>
          <ListItemIcon className={classes.flagIcon}>
            <img
              src={`${process.env.PUBLIC_URL}/static/media/flags/${this.state.country}.svg`}
              width={24}
              height={20}
              alt={t(this.state.country)}
            />
          </ListItemIcon>
          <ListItemText className={classes.selectText}>
            {t(this.state.country)}
          </ListItemText>
          <ListItemIcon className={classes.dropDownIcon}>
            <ArrowDropDownIcon />
          </ListItemIcon>
        </MenuItem>
        {this.renderOptions()}
      </React.Fragment>
    );
  }
}

export default withTranslation('languageSelect')(withStyles(styles)(LanguageSelect));

