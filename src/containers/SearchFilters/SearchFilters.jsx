import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import styles from './SearchFilters.styles';
import { providers } from '../../utils';
import { SearchContext } from '../../screens/Search/Search'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import Button from '@material-ui/core/Button/Button';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import VideoIcon from '@material-ui/icons/OndemandVideo';
import ArticleIcon from '@material-ui/icons/Book';
import OrganizationIcon from '@material-ui/icons/Language';
import ProductIcon from '@material-ui/icons/AddShoppingCart';
import PlaceIcon from '@material-ui/icons/LocationCity';
import TrompaIcon from '../../components/Icons/TrompaIcon';
import CompositionIcon from '../../components/Icons/CompositionIcon';

class SearchFilters extends Component {
  filters = [{
    label: 'All',
    icon: TrompaIcon,
    value: 'all',
  }, {
    label: 'People',
    icon: PersonIcon,
    value: 'Person',
    filters: [{
      label: 'Profession',
      name: 'profession',
      options: [{
        label: 'All',
        value: ''
      }, {
        label: 'Composer',
        value: 'composer'
      }, {
        label: 'Musician',
        value: 'musician'
      }, {
        label: 'Conductor',
        value: 'conductor'
      }]
    }, {
      label: 'Year',
      name: 'year',
      options: [{
        label: 'All',
        value: ''
      }, {
        label: '1900 - 1910',
        value: '>=1900 && <=1910'
      }, {
        label: '1910 - 1910',
        value: '>=1910 && <=1910'
      }, {
        label: '1920 - 1910',
        value: '>=1920 && <=1910'
      }, {
        label: '1930 - 1910',
        value: '>=1930 && <=1910'
      }]
    }, {
      label: 'Country',
      name: 'country',
      options: [{
        label: 'All',
        value: ''
      }, {
        label: 'Austria',
        value: 'austria'
      }, {
        label: 'Germany',
        value: 'germany'
      }]
    }]
  }, {
    label: 'Compositions',
    icon: CompositionIcon,
    value: 'MusicComposition'
  }, {
    label: 'Videos',
    icon: VideoIcon,
    value: 'VideoObject'
  },{
    label: 'Articles',
    icon: ArticleIcon,
    value: 'Article'
  }, {
    label: 'Organizations',
    icon: OrganizationIcon,
    value: 'Organization'
  }, {
    label: 'Products',
    icon: ProductIcon,
    value: 'Product'
  }, {
    label: 'Places',
    icon: PlaceIcon,
    value: 'Place'
  }];

  renderFilters(searchPhrase, selectedCategory, setCategory) {
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
              selected={selectedCategory === value}
              onClick={event => setCategory(event, value)}
            >
              {Icon && (
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText primary={label} className={classes.categoryLabel} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, selectedCategory, setCategory }) => (
          <div className={classes.root}>
            {selectedCategory === 'all'
              ? <Typography variant="h5" className={classes.allCategorySelected}>All</Typography>
              : <Button 
                onClick={event => setCategory(event, 'all')}
                >
                  <KeyboardArrowLeft /> Back to all
                </Button>
              }
            {this.renderFilters(searchPhrase, selectedCategory, setCategory)}
          </div>
        )}
      </SearchContext.Consumer >
    );
  }
}

export default providers(
  SearchFilters,
  translate('searchFilters'),
  withStyles(styles),
  withRouter,
);
