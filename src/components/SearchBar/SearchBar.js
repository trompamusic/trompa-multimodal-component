import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import styles from './SearchBar.styles';

class SearchBar extends Component {
  state = {
    searchPhrase: '',
  };

  static propTypes = {
    onSubmit       : PropTypes.func,
    placeholderText: PropTypes.string,
  };

  static defaultProps = {};

  handleChange = event => {
    this.setState({ searchPhrase: event.target.value });
    this.handleSubmitDebounced(event);
  };

  handleSubmit = event => {
    const { searchPhrase, searchTags } = this.state;

    event.preventDefault();
    this.props.onSubmit(event, searchPhrase, searchTags);
  };

  handleSubmitDebounced = debounce(350, this.handleSubmit);

  render() {
    const { classes, placeholderText } = this.props;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            placeholder={placeholderText}
            type="text"
            name="search"
            value={this.state.searchPhrase}
            onChange={this.handleChange}
            className={classes.textField}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
              ),
              classes: {
                root          : classes.cssOutlinedInput,
                focused       : classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
