import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
function PrivateRoute({
  component: Component,
  children,
  AuthReducer,
  location,
  permission,
  ...rest
}) {
  let isAuthenticated;
  if (!permission) isAuthenticated = true;
  if (AuthReducer.token && AuthReducer.permissions.includes(permission)) {
    isAuthenticated = AuthReducer.permissions.includes(permission);
  }

  console.log({ permission, isAuthenticated });

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

const mapStateToProps = ({ AuthReducer }) => ({ AuthReducer });

export default withRouter(connect(mapStateToProps)(PrivateRoute));
