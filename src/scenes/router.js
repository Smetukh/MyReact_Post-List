import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";
export const routes = {
  home: "/",
  notFound: "/notFound",
  active: "/active",
  completed: "/completed"
};

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={routes.home}
          render={props => <Home {...props} checkedPosts={""} />}
        />
        <Route
          path={routes.active}
          render={props => <Home {...props} checkedPosts={false} />}
        />
        <Route
          exact
          path={routes.completed}
          render={props => <Home {...props} checkedPosts={true} />}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
