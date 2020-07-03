import React from 'react';
import {Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Registration from './containers/Registration/Registration';
import Logout from './containers/Logout/Logout';
import * as actionCreator from './store/actions';

class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/register" exact component={Registration} />
          {this.props.isAuthenticated && <Route path="/checkout" component={Checkout} />}
          <Route path="/orders" exact component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.username != null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actionCreator.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
