import React from "react";

import { Route, HashRouter, Switch } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import PropertyAddPage from "./pages/PropertyAddPage/PropertyAddPage";

const MainRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={DashboardPage} />
        <Route path="/property" exact component={PropertyPage} />
        <Route path="/property/add" exact component={PropertyAddPage} />
      </Switch>
    </HashRouter>
  );
};

export default MainRouter;