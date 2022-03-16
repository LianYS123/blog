import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AppLayout from "layout";
import routers from "./index";

import { useInitApp } from "hooks/app";

import Editor from "pages/editor";
import Home from "pages/home";
import ArticleList from "pages/article";
import Detail from "pages/detail";
import Space from "pages/space";
import Moment from "pages/moment";
import NotFound from "pages/404";
import Login from "pages/login";
import About from "pages/about";

export const APP_ROUTES = [
  {
    path: routers.DETAIL,
    component: Detail,
    title: "文章详情"
  },
  {
    path: routers.EDITOR, // 新增文章
    component: Editor,
    title: "写文章"
  },
  {
    path: routers.EDITOR_EDIT, // 编辑文章
    component: Editor,
    title: "编辑文章"
  },
  {
    path: routers.LOGIN,
    component: Login,
    title: "登录"
  },
  {
    path: "/pages",
    component: AppLayout,
    children: [
      {
        path: routers.HOME,
        component: Home,
        title: "首页"
      },
      {
        path: routers.ARTICLE_LIST,
        component: ArticleList,
        title: "文章列表"
      },
      {
        path: routers.USER_SPACE,
        component: Space,
        title: "个人空间"
      },
      {
        path: routers.MOMENT,
        component: Moment,
        title: "动态"
      },
      {
        path: routers.ABOUT,
        component: About,
        title: "关于"
      },
      {
        path: routers.NOT_FOUND,
        component: NotFound,
        title: "404"
      },
      {
        key: "redirect",
        redirect: routers.NOT_FOUND
      }
    ]
  },
  {
    path: routers.TMP_REDIRECT, // 临时重定向，用于react-router刷新界面时跳转到该路由再跳回来
    component: "div"
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
  return renderAppRoutes(APP_ROUTES);
};

export default AppRoutes;
