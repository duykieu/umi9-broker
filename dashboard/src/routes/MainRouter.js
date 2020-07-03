import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import routesList from "./routesList";
import PrivateRoute from "./PrivateRoute";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";

const MainRouter = () => {
  const location = useLocation();

  const history = useHistory();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    return history.listen(location => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, [history]);

  return (
    // <React.Fragment>
    <Switch>
      {routesList.map(({ path, component, isPublic, exact, ...rest }) => {
        if (isPublic) {
          return <Route key={path} path={path} component={component} {...rest} />;
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
  );
};

export default MainRouter;
