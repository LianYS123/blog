import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import AppLayout from "layout";
import routers from "./index";

import { useInitApp } from "hooks/app";
// import loadable from "utils/loadable";

import Home from "pages/home";
import TagManager from "pages/tags";
import NotFound from "pages/404";
import Login from "pages/login";

const APP_ROUTES = [
  {
    path: routers.LOGIN,
    component: Login // 字符串路径或组件都可
  },
  {
    path: "/pages",
    component: AppLayout,
    children: [
      {
        path: routers.HOME,
        component: Home
      },
      // {
      //   path: routers.ARTICLE,
      //   component: ArticleManager
      // },
      {
        path: routers.TAG,
        component: TagManager
      },
      {
        path: routers.NOT_FOUND,
        component: NotFound
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
  // const getPageComponent = component => {
  //   if (!component) return null;
  //   const Comp =
  //     typeof component === "string" ? loadable(component) : component;
  //   return Comp;
  // };
  const renderAppRoutes = routes => {
    return (
      <Switch>
        {routes.map(
          ({ path, component: Comp, children, redirect, key, ...rest }) => {
            if (redirect) {
              return <Redirect key={key || redirect} to={redirect} />;
            }
            // const Comp = getPageComponent(component);
            const commonProps = { key: key || path, path, ...rest };
            return children?.length ? (
              <Comp {...commonProps}>{renderAppRoutes(children)}</Comp>
            ) : (
              <Route exact={true} component={Comp} {...commonProps} />
            );
          }
        )}
      </Switch>
    );
  };
  const routes = renderAppRoutes(APP_ROUTES);
  return <Router>{routes}</Router>;
};

export default AppRoutes;
