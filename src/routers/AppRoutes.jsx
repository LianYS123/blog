import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import AppLayout from "layout";
import routers from "./index";

import Login from "pages/login";
import { useInitApp } from "hooks/app";
import loadable from "utils/loadable";

const routes = [
  {
    path: routers.HOME,
    component: "home"
  },
  {
    path: routers.ARTICLE_LIST,
    component: "list"
  },
  {
    path: routers.EDITOR,
    component: "editor"
  },
  {
    path: routers.EDITOR_EDIT,
    component: "editor"
  },
  {
    path: routers.DETAIL,
    component: "detail"
  },
  {
    path: routers.USER_SPACE,
    component: "space"
  },
  {
    path: routers.ESSAY,
    component: "essay"
  },
  {
    path: routers.NOT_FOUND,
    component: "404"
  }
];

// 页面路由
const AppRoutes = () => {
  useInitApp(); // 初始化应用数据
  return (
    <Router>
      <Switch>
        <Route path={routers.LOGIN} component={Login} />
        <Route path="/pages">
          <AppLayout>
            <Switch>
              {routes.map(({ path, component, ...rest }) => {
                const Comp =
                  typeof component === "string"
                    ? loadable(component)
                    : component;
                return (
                  <Route
                    key={path}
                    path={path}
                    exact={true}
                    component={Comp}
                    {...rest}
                  />
                );
              })}
            </Switch>
          </AppLayout>
        </Route>
        <Redirect to={routers.HOME} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
