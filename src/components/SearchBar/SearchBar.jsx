import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { debounce } from "throttle-debounce";
import styles from './SearchBar.styles';

class SearchBar extends Component {
  state = { searchPhrase: '' };
  
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {};

  handleChange = (event) => {
    this.setState({ searchPhrase: event.target.value });
    this.handleSubmitDebounced(event);
  };

  handleSubmit = (event) => {
    const { searchPhrase } = this.state;
    event.preventDefault();
    
    this.props.onSubmit(event, searchPhrase);
  };

  handleSubmitDebounced = debounce(250, this.handleSubmit);

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            placeholder="Search"
            type="text"
            value={this.state.searchPhrase}
            onChange={this.handleChange}
            className={classes.textField}
          />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
