import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import AppLayout from "layout";
import routers from "./index";

import Login from "pages/login";
import Home from "pages/home";
import NotFound from "pages/404";
import Editor from "pages/editor/index";
import Detial from "pages/detail/index";
import { useInitApp } from "hooks/app";
import Space from "pages/space";
import ArticleList from "pages/list";

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
              <Route path={routers.HOME} component={Home} />
              <Route path={routers.ARTICLE_LIST} component={ArticleList} />
              <Route exact path={routers.EDITOR} component={Editor} />
              <Route path={routers.EDITOR_EDIT} component={Editor} />
              <Route path={routers.DETAIL} component={Detial} />
              <Route path={routers.USER_SPACE} component={Space} />

              <Route path={routers.NOT_FOUND} component={NotFound} />
              <Redirect to={routers.NOT_FOUND} />
            </Switch>
          </AppLayout>
        </Route>
        <Redirect to={routers.HOME} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
