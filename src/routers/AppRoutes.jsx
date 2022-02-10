import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import AppLayout from "layout";
import routers from "./index";

import { useInitApp } from "hooks/app";

import Editor from "pages/editor";
import Home from "pages/home";
import ArticleList from "pages/article";
import Detail from "pages/detail";
import Space from "pages/space";
import Essay from "pages/essay";
import NotFound from "pages/404";
import Login from "pages/login";

const APP_ROUTES = [
  {
    path: routers.HOME,
    component: Home
  },
  {
    path: "/pages",
    component: AppLayout,
    children: [
      {
        path: routers.LOGIN,
        component: Login
      },
      {
        path: routers.ARTICLE_LIST,
        component: ArticleList
      },
      {
        path: routers.DETAIL,
        component: Detail
      },
      {
        path: routers.USER_SPACE,
        component: Space
      },
      {
        path: routers.ESSAY,
        component: Essay
      },
      {
        path: routers.NOT_FOUND,
        component: NotFound
      },
      {
        path: routers.EDITOR, // 新增文章
        component: Editor
      },
      {
        path: routers.EDITOR_EDIT, // 编辑文章
        component: Editor
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
  const renderAppRoutes = routes => {
    return (
      <Switch>
        {routes.map(
          ({ path, component: Comp, children, redirect, key, ...rest }) => {
            if (redirect) {
              return <Redirect key={key || redirect} to={redirect} />;
            }
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
