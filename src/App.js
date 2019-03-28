import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
// import Header from "./shared/header/header";

import Router from "./Router";
import { history } from "./helpers/history";
import { connect } from "react-redux";
import { alertActions } from "./actions/alertActions";

/* const Navigation = props => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/userManagement">User Management</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Register User</NavLink>
        </li>
      </ul>
    </nav>
  );
}; */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };
    const { dispatch } = this.props;
    history.listen((location, action) => {
      console.log("APP releoaded with location", location);

      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          {/* <Header isAuthorized={this.state.isLogin} /> */}
        </div>
        {/* <Navigation /> */}
        <Router />
      </React.Fragment>
    );
  }
}

//export default App;

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
