import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import styles from './SearchFilters.styles';
import { providers } from '../../utils';
import { SearchContext } from '../SearchProvider/SearchProvider'
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VideocamIcon from '@material-ui/icons/Videocam';
import SearchIcon from '@material-ui/icons/Search';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MessageIcon from '@material-ui/icons/Message';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import MusicFileIcon from '../../components/Icons/MusicFileIcon';

class SearchFilters extends Component {
  filters = [{
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

  renderFilters(selectedCategory, setCategory) {
    const { classes } = this.props;

    if (selectedCategory !== 'all') {
      const activeFilter = this.filters.find(({ value }) => value === selectedCategory);

      if (activeFilter && activeFilter.filters) {
        return activeFilter.filters.map(({ value, label, options }) => (
          <React.Fragment key={value}>
            <ListItem className={classes.filterHeaderItem}>
              <ListItemText primary={label} primaryTypographyProps={{ className: classes.filterHeaderText }}  />
            </ListItem>
            <Divider />
            {options.map((option) => (
              <React.Fragment key={option.name}>
                <ListItem
                  button
                >
                  <Checkbox
                    checked
                    tabIndex={-1}
                    disableRipple
                    className={classes.filterCheckbox}
                  />
                  <ListItemText primary={option.label} />
                </ListItem>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))
      }
    }

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
                <Typography className={classes.resultsNumber}>(num)</Typography>
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
        {({ selectedCategory, setCategory }) => (
          <div className={classes.root}>
            <Typography className={classes.header}>{t('filters')}</Typography>
            {this.renderFilters(selectedCategory, setCategory)}
          </div>
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
