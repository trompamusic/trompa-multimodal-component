import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { debounce } from 'throttle-debounce';
import styles from './SearchFilter.styles';

class SearchFilter extends Component {
  state = {
    searchValue    : '',
    selectedOptions: [],
  };

  onChangeDebounced = debounce(300, false, (searchValue, selectedOptions) => this.props.onChange(searchValue, selectedOptions));

  handleSearchChange = event => {
    const searchValue  = event.currentTarget.value;

    this.setState({ searchValue });

    this.onChangeDebounced(searchValue, this.state.selectedOptions.map(item => item.identifier));
  };

  handleCheckboxChange = event => {
    const value = event.target.value;

    let selectedOptions;

    if (this.state.selectedOptions.includes(value)) {
      selectedOptions = this.state.selectedOptions.filter(item => item !== value);
    } else {
      selectedOptions = this.state.selectedOptions.concat(value);
    }

    this.setState({ selectedOptions });
    this.onChangeDebounced(this.state.searchValue, selectedOptions);
  };

  clearSelectedOptions = event => {
    event.preventDefault();

    this.setState({ selectedOptions: [] });
    this.onChangeDebounced(this.state.searchValue, []);
  };

  clearInputValue = () => {
    this.setState({ searchValue: '' });
    this.onChangeDebounced('', this.state.selectedOptions);
  };

  render() {
    const { classes, filter } = this.props;

    // there are no options
    if (!filter) {
      return null;
    }

    const selectedCount      = this.state.selectedOptions.length;
    const selectedDictionary = Object.fromEntries(this.state.selectedOptions.map(value => [value, true]));

    return (
      <div className={classes.root} key={filter.name}>
        <Typography className={classes.type} gutterBottom>{filter.name}</Typography>
        {filter.searchType ? (
          <TextField
            className={classes.filterTextField}
            inputProps={{ className: classes.filterInput }}
            InputProps={{
              classes     : { adornedEnd: classes.filterInputAdornedEnd },
              endAdornment: this.state.searchValue.length > 0 && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={this.clearInputValue}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={this.handleSearchChange}
            value={this.state.searchValue}
            placeholder="Filter..."
            size="small"
            variant="outlined"
            fullWidth
          />
        ) : null}
        {filter.options?.slice(0, 8).map(({ label, value }) => (
          <div key={value}>
            <FormControlLabel
              classes={{ label: classes.formControlLabel }}
              className={classes.formControl}
              key={value}
              control={
                <Checkbox
                  className={classes.checkbox}
                  size="small"
                  icon={<CheckBoxOutlineBlank fontSize="small" />}
                  checkedIcon={<CheckBox fontSize="small" />}
                  color="primary"
                  value={value}
                  onChange={this.handleCheckboxChange}
                  checked={!!selectedDictionary[value]}
                  disableRipple
                />
              }
              label={label}
            />
          </div>
        ))}
        {selectedCount > 0 ? (
          <Typography variant="caption">
            {selectedCount} selected <Link href="#" onClick={this.clearSelectedOptions}>clear</Link>
          </Typography>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(SearchFilter);
