import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VideocamIcon from '@material-ui/icons/Videocam';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { Checkbox } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MusicFileIcon from '../../components/Icons/MusicFileIcon';
import FilterIcon from '../../components/Icons/FilterIcon';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider';
import styles from './SearchFilters.styles';
import SearchFilter from '../../components/SearchFilter';

class SearchFilters extends Component {
  state = {
    openMobileFilters: false,
  };

  renderMobileDrawer = (selectedCategory, setCategory, searchResults, counts, total, filterTypes) => {
    const { classes, t }        = this.props;
    const { openMobileFilters } = this.state;

    return (
      <SwipeableDrawer
        open={openMobileFilters}
        onOpen={() => this.setState({ openMobileFilters: true })}
        onClose={() => this.setState({ openMobileFilters: false })}
      >
        <div className={classes.drawer}>
          <div>
            <div className={classes.drawerHeader}>
              <Typography className={classes.header}>{t('filterBy')}</Typography>
              <IconButton className={classes.close} onClick={() => this.setState({ openMobileFilters: false })} aria-label="close drawer">
                <CloseIcon />
              </IconButton>
            </div>
            <Typography className={classes.type}>{t('type')}</Typography>
            {this.renderFilters(selectedCategory, setCategory, searchResults, counts, total, filterTypes)}
          </div>
          <div>
            <Button
              className={classes.button}
              onClick={() => this.setState({ openMobileFilters: false })}
            >
              {`${total} ${t('results')}`}
            </Button>
          </div>
        </div>
      </SwipeableDrawer>
    );
  };

  renderFilters(filters, filtersState, updateFilter) {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {filters.map(filter => (
          <SearchFilter key={filter.name} filter={filter} onChange={(searchValue, selected) => updateFilter(filter, searchValue, selected)} />
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { t, classes } = this.props;

    return (
      <SearchContext.Consumer>
        {({ filters, total, updateFilter, filtersState }) => (
          <React.Fragment>
            <Hidden smDown>
              <div className={classes.root}>
                {this.renderFilters(filters, filtersState, updateFilter)}
              </div>
            </Hidden>
            <Hidden mdUp>
              <Button
                className={classes.button}
                onClick={() => this.setState({ openMobileFilters: true })}
              >
                <FilterIcon className={classes.buttonIcon} />
                {`${t('filter')} ${total} ${t('results')}`}
              </Button>
              {this.renderMobileDrawer(filters, filtersState, updateFilter)}
            </Hidden>
          </React.Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default providers(
  SearchFilters,
  withTranslation('searchFilters'),
  withStyles(styles),
);
