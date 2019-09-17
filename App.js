import * as jwt from 'jwt-decode';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminDashboard from './containers/admin/components/AdminDashboard';
import SuperAdminDashboard from './containers/admin/components/SuperAdminDashboard';
import { storeUserSuccessful } from './containers/login/actionCreators/loginActionCreators';
import Login from './containers/login/login.jsx';
import Accepted from './containers/suggestion/components/navBarComponents/Accepted';
import Active from './containers/suggestion/components/navBarComponents/Active';
import Declined from './containers/suggestion/components/navBarComponents/Declined';
import Implemented from './containers/suggestion/components/navBarComponents/Implemented';
import MySuggestions from './containers/suggestion/components/navBarComponents/MySuggestions';
import NavbarWrapper from './containers/suggestion/components/navBarComponents/NavBarWrapper';
import Pending from './containers/suggestion/components/navBarComponents/Pending';
import LandingPage from './LandingPage';

export const PrivateRoute = ({ component: Component, authorized, redir, ...rest }) => (
  <Route {...rest} render={(props) => {
    return authorized === true
      ? <Component {...props} />
      : <Redirect to={redir} />
  }
  } />
)

class App extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.props.storeUserSuccessful(jwt(token));


    }

  }

  render() {
    const landingRoute = <Redirect to="/landingPage" />;
    const dashboardRoute = window.location.pathname === "/" ? <Redirect to="/active" /> : undefined;
    const isLogged = localStorage.getItem('user') !== null;


    let content = (
      <React.Fragment>

        <Switch>
          <Route exact path="/landingPage" component={LandingPage}></Route>
          <Route exact path="/login" component={Login}></Route>
        </Switch>
        {landingRoute}
      </React.Fragment>
    )

    if (isLogged) {

      const routes = (
        <React.Fragment>
          <Switch>

            <Route exact path="/active" component={Active} />
            <Route exact path="/pending" component={Pending} />
            <Route exact path="/accepted" component={Accepted} />
            <Route path="/implemented" component={Implemented} />            
            <Route path="/declined" component={Declined} />
            <Route exact path="/mysuggestions" component={MySuggestions} />

            {this.props.user && this.props.user.role &&
              <PrivateRoute path='/admin' component={AdminDashboard} authorized={this.props.user.role === "ADMIN"} redir="/active" />
            }
            {this.props.user && this.props.user.role &&
              <PrivateRoute path='/super' component={SuperAdminDashboard} authorized={this.props.user.role === "SUPER_ADMIN"} redir="/active" />
            }
          </Switch>
          {dashboardRoute}
        </React.Fragment>
      )
      content = (
        <NavbarWrapper showNav={isLogged}>
          {routes}
        </NavbarWrapper>
      )
    }
    return (
      <Router >
        {content}
      </Router>
    )
  }
}
const mapStateToProps = (state) => {
  return {

    user: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {

    storeUserSuccessful: (user) => dispatch(storeUserSuccessful(user)),
    // storeNotifications: (user) => dispatch(storeNotifications(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
