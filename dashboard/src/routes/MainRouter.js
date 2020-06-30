import React from "react";
import { useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import routesList from "./routesList";
import PrivateRoute from "./PrivateRoute";

const MainRouter = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      {/*
      This is no different than other usage of
      <CSSTransition>, just make sure to pass
      `location` to `Switch` so it can match
      the old location as it animates out.
    */}
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Switch location={location}>
          {routesList.map(({ path, component, isPublic, exact, ...rest }) => {
            if (isPublic) {
              return (
                <Route key={path} path={path} component={component} {...rest} />
              );
            } else {
              return (
                <PrivateRoute
                  key={path}
                  path={path}
                  exact={exact ? exact : false}
                  component={component}
                  {...rest}
                />
              );
            }
          })}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default MainRouter;
