import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import AppLayout from "layout";
import routers from "./index";

import { useInitApp } from "hooks/app";
import loadable from "utils/loadable";

const APP_ROUTES = [
  {
    path: routers.LOGIN,
    component: "login"
  },
  {
    path: "/test",
    component: "test"
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
    path: "/pages",
    component: AppLayout,
    children: [
      {
        path: routers.HOME,
        component: "home"
      },
      {
        path: routers.ARTICLE_LIST,
        component: "article"
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
      },
      {
        key: "redirect",
        redirect: routers.NOT_FOUND
      }
    ]
  },
  {
    key: "redirect",
    redirect: routers.HOME
  }
];

// 页面路由
const AppRoutes = () => {
  useInitApp(); // 初始化应用数据
  const getPageComponent = component => {
    if (!component) return null;
    const Comp =
      typeof component === "string" ? loadable(component) : component;
    return Comp;
  };
  const renderAppRoutes = routes => {
    return (
      <Switch>
        {routes.map(({ path, component, children, redirect, key, ...rest }) => {
          if (redirect) {
            return <Redirect key={key || redirect} to={redirect} />;
          }
          const Comp = getPageComponent(component);
          const commonProps = { key: key || path, path, ...rest };
          return children?.length ? (
            <Comp {...commonProps}>{renderAppRoutes(children)}</Comp>
          ) : (
            <Route exact={true} component={Comp} {...commonProps} />
          );
        })}
      </Switch>
    );
  };
  const routes = renderAppRoutes(APP_ROUTES);
  return <Router>{routes}</Router>;
};

export default AppRoutes;
