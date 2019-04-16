import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../../containers/NavBar/index';
import Footer from '../../Footer/Footer';
import styles from './DefaultLayout.styles';

class DefaultLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <NavBar />
        {children}
        <Footer />
      </Fragment>
    );
  }
}

export default withStyles(styles)(DefaultLayout);
