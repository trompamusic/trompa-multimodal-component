import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Route as ReactRouterRoute, Switch, withRouter } from 'react-router-dom';
import Home from '../../screens/Home';
import Process from '../../screens/Process';
import Search from '../../screens/Search';
import NotFound from '../../screens/NotFound';
import DefaultLayout from '../Layouts/DefaultLayout/DefaultLayout';
import styles from './Root.styles';

const Route = ({ component: Component, layout, ...rest }) => {
  const Layout = layout || DefaultLayout;

  return (
    <ReactRouterRoute
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export class Root extends Component {
  render() {
    return (
      <Fragment>
        {this.renderContent()}
      </Fragment>
    );
  }

  renderContent() {
    if (this.props.error) {
      return <div>Something wen't terribly wrong!</div>;
    }

    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/search" component={Search} exact />
        <Route path="/process/:id" component={Process} exact />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default withRouter(withStyles(styles)(Root));
