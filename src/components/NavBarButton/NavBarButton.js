import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NavBarButton.styles';

class NavBarButton extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    to     : PropTypes.string,
    color  : PropTypes.oneOf(['default', 'primary', 'secondary']),
  };

  static defaultProps = {
    color: 'default',
  };

  render() {
    const { classes, className, color, exact, to, ...rest } = this.props;

    let Component = 'a';
    let props     = {};

    if (to) {
      Component = NavLink;
      props     = {
        activeClassName: classes.active,
        exact,
        to,
      };
    }

    return (
      <Component
        className={classNames(classes.link, classes[color], className)}
        {...props}
        {...rest}
      >
        <span className={classes.label}>
          {this.props.children}
        </span>
      </Component>
    );
  }
}

export default withStyles(styles, { name: 'RmvNavBarButton' })(NavBarButton);
