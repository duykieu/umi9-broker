import React from "react";

import { Route, HashRouter, Switch } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import PropertyAddPage from "./pages/PropertyAddPage/PropertyAddPage";
import AdsPage from "./pages/AdsPage/AdsPage";
import UserPage from "./pages/UserPage/UserPage";

const MainRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={DashboardPage} />
        <Route path="/property" exact component={PropertyPage} />
        <Route path="/property/add" component={PropertyAddPage} />
        <Route path="/ads" component={AdsPage} />
        <Route path="/ads/add" component={AdsPage} />
        <Route path="/user" component={UserPage} />
      </Switch>
    </HashRouter>
  );
};

export default MainRouter;
