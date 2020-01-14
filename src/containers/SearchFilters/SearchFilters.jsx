import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
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
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MessageIcon from '@material-ui/icons/Message';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import MusicFileIcon from '../../components/Icons/MusicFileIcon';
import FilterIcon from '../../components/Icons/FilterIcon';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider'
import styles from './SearchFilters.styles';

class SearchFilters extends Component {
  state = { 
    open: false,
  };

  filters = [
    {
      label: this.props.t('filter.all'),
      icon: SearchIcon,
      value: 'all',
    }, 
    {
      label: this.props.t('filter.people'),
      icon : AccountCircleIcon,
      value: 'Person',
    }, 
    {
      label: this.props.t('filter.compositions'),
      icon : LibraryMusicIcon,
      value: 'MusicComposition'
    }, 
    {
      label: this.props.t('filter.scores'),
      icon : MusicFileIcon,
      value: 'Score'
    },
    {
      label: this.props.t('filter.annotations'),
      icon : MessageIcon,
      value: 'Annotation'
    },
    {
      label: this.props.t('filter.videos'),
      icon : VideocamIcon,
      value: 'VideoObject'
    },
    {
      label: this.props.t('filter.tracks'),
      icon : MusicNoteIcon,
      value: 'Track'
    },
  ];

  renderResultCountPerType = (data) => {
    return (data || []).reduce((acc, value) => {
      if (typeof acc[value.__typename] === 'undefined') {
        acc[value.__typename] = data.filter(({ __typename }) => __typename === value.__typename).length;
      }

      return acc;
    }, {});
  };

  renderMobileDrawer = (selectedCategory, setCategory, searchResults) => {
    const { classes, t } = this.props;
    const { open }    = this.state;

    const counts = this.renderResultCountPerType(searchResults);

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
              <IconButton onClick={() => this.setState({ open: false })} aria-label='close drawer'>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography className={classes.type}>{t('type')}</Typography>
            {this.filters.map(({ value, label, icon: Icon }) => (
              <React.Fragment key={value}>
                <ListItem
                  button
                  className={classNames(classes.filter, {
                    [classes.selected]: selectedCategory === value,
                  })}
                  onClick={event => setCategory(event, value)}
                >
                  <div className={classes.filterContainer}>
                    {Icon && (
                      <ListItemIcon className={classes.iconContainer}>
                        <Icon className={classes.icon} />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={label} className={classes.label} />
                    <Typography className={classes.resultsNumber}>
                      ({0 || label === 'All' ? searchResults.length : counts[`${value}`] || 0})
                    </Typography>
                  </div>
                </ListItem>
              </React.Fragment>
            ))}
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
    )
  }

  renderFilters(selectedCategory, setCategory, searchResults) {
    const { classes } = this.props;

    const counts = this.renderResultCountPerType(searchResults);

    return (
      <React.Fragment>
        {this.filters.map(({ value, label, icon: Icon }) => (
          <React.Fragment key={value}>
            <ListItem
              button
              className={classNames(classes.filter, {
                [classes.selected]: selectedCategory === value,
              })}
              onClick={event => setCategory(event, value)}
            >
              <div className={classes.filterContainer}>
                {Icon && (
                  <ListItemIcon className={classes.iconContainer}>
                    <Icon className={classes.icon} />
                  </ListItemIcon>
                )}
                <ListItemText primary={label} className={classes.label} />
                <Typography className={classes.resultsNumber}>
                  ({0 || label === 'All' ? searchResults.length : counts[`${value}`] || 0})
                </Typography>
              </div>
            </ListItem>
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  }

  render() {
    const { t, classes } = this.props;

    return (
      <SearchContext.Consumer>
        {({ selectedCategory, setCategory, searchResults }) => (
          <React.Fragment>
            <Hidden smDown>
              <div className={classes.root}>
                <Typography className={classes.header}>{t('filterBy')}</Typography>
                <Typography className={classes.type}>{t('type')}</Typography>
                {this.renderFilters(selectedCategory, setCategory, searchResults)}
              </div>
            </Hidden>
            <Hidden mdUp>
              <Button 
                className={classes.button}
                onClick={() => this.setState({ open: true })}
              >
                <FilterIcon className={classes.buttonIcon} />
                {`${t('filterMobile')} ${searchResults.length} ${t('resultsLower')}`}
              </Button>
              {this.renderMobileDrawer(selectedCategory, setCategory, searchResults)}
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
  withRouter,
);
