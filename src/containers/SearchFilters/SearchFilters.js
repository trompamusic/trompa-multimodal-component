import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VideocamIcon from '@material-ui/icons/Videocam';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import MusicFileIcon from '../../components/Icons/MusicFileIcon';
import FilterIcon from '../../components/Icons/FilterIcon';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider';
import styles from './SearchFilters.styles';

class SearchFilters extends Component {
  state = {
    open: false,
  };

  filters = [
    {
      label: this.props.t('filterMenu.all'),
      icon : SearchIcon,
      value: 'all',
    },
    {
      label: this.props.t('filterMenu.people'),
      icon : AccountCircleIcon,
      value: 'Person',
    },
    {
      label: this.props.t('filterMenu.compositions'),
      icon : LibraryMusicIcon,
      value: 'MusicComposition',
    },
    {
      label: this.props.t('filterMenu.scores'),
      icon : MusicFileIcon,
      value: 'DigitalDocument',
    },
    {
      label: this.props.t('filterMenu.videos'),
      icon : VideocamIcon,
      value: 'VideoObject',
    },
  ];

  renderMobileDrawer = (selectedCategory, setCategory, searchResults, counts, total) => {
    const { classes, t } = this.props;
    const { open }       = this.state;

    return (
      <SwipeableDrawer
        open={open}
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.setState({ open: false })}
      >
        <div className={classes.drawer}>
          <div>
            <div className={classes.drawerHeader}>
              <Typography className={classes.header}>{t('filterBy')}</Typography>
              <IconButton onClick={() => this.setState({ open: false })} aria-label="close drawer">
                <CloseIcon />
              </IconButton>
            </div>
            <Typography className={classes.type}>{t('type')}</Typography>
            {this.renderFilters(selectedCategory, setCategory, searchResults, counts, total)}
          </div>
          <div>
            <Button
              className={classes.button}
              onClick={() => this.setState({ open: false })}
            >
              {`${searchResults.length} ${t('resultsLower')}`}
            </Button>
          </div>
        </div>
      </SwipeableDrawer>
    );
  }

  renderFilters(selectedCategory, setCategory, searchResults, counts, total) {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.filters.map(({ value, label, icon: Icon }) => (
          <React.Fragment key={value}>
            <ListItem
              className={classNames(classes.filter, {
                [classes.selected]: selectedCategory === value,
              })}
              onClick={event => setCategory(event, value)}
              button
            >
              <div className={classes.filterContainer}>
                {Icon && (
                  <ListItemIcon className={classes.iconContainer}>
                    <Icon className={classes.icon} />
                  </ListItemIcon>
                )}
                <ListItemText primary={label} className={classes.label} />
                <Typography className={classes.resultsNumber}>
                  ({label === 'All' ? total : counts[value]})
                </Typography>
              </div>
            </ListItem>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { t, classes } = this.props;

    return (
      <SearchContext.Consumer>
        {({ selectedCategory, setCategory, searchResults, counts, total }) => (
          <React.Fragment>
            <Hidden smDown>
              <div className={classes.root}>
                <Typography className={classes.header}>{t('filterBy')}</Typography>
                <Typography className={classes.type}>{t('type')}</Typography>
                {this.renderFilters(selectedCategory, setCategory, searchResults, counts, total)}
              </div>
            </Hidden>
            <Hidden mdUp>
              <Button
                className={classes.button}
                onClick={() => this.setState({ open: true })}
              >
                <FilterIcon className={classes.buttonIcon} />
                {`${t('filter')} ${total} ${t('results')}`}
              </Button>
              {this.renderMobileDrawer(selectedCategory, setCategory, searchResults, counts, total)}
            </Hidden>
          </React.Fragment>
        )}
      </SearchContext.Consumer >
    );
  }
}

export default providers(
  SearchFilters,
  withTranslation('searchFilters'),
  withStyles(styles),
);
