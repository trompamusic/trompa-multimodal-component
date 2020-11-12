import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FilterIcon from '../../components/Icons/FilterIcon';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider';
import SearchFilter from '../../components/SearchFilter';
import styles from './SearchFilters.styles';

class SearchFilters extends Component {
  state = {
    openMobileFilters: false,
  };

  renderMobileDrawer = (filters, filtersState, updateFilter, total) => {
    const { classes, t }        = this.props;
    const { openMobileFilters } = this.state;

    return (
      <SwipeableDrawer
        open={openMobileFilters}
        onOpen={() => this.setState({ openMobileFilters: true })}
        onClose={() => this.setState({ openMobileFilters: false })}
        keepMounted
      >
        <div className={classes.drawer}>
          <div>
            <div className={classes.drawerHeader}>
              <IconButton className={classes.close} onClick={() => this.setState({ openMobileFilters: false })} aria-label="close drawer">
                <CloseIcon />
              </IconButton>
            </div>
            {this.renderFilters(filters, filtersState, updateFilter)}
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
              {this.renderMobileDrawer(filters, filtersState, updateFilter, total)}
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
