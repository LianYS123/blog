import App from 'pages/App';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import Layout from 'pages/layout';
import { lazy, Suspense, createElement } from 'react';
const asyncLoad = (promise) => () => {
  const [component, setComponent] = useState(null);
  useEffect(() => {
    promise.then(({ default: Comp }) => setComponent(<Comp />));
  }, []);
  return <Spin spinning={!component}>{component}</Spin>;
};
const asyncLoad2 = (pro) => () => (
  <Suspense fallback={<Spin />}>{createElement(lazy(() => pro))}</Suspense>
);
export default (
  <Route path='/'>
    <Layout>
      <Switch>
        <Route path='/' exact={true}>
          <App></App>
        </Route>
        <Route
          path='/blog'
          exact={true}
          component={asyncLoad2(import('pages/blog'))}
        />
        <Route
          path='/blog/edit'
          exact={true}
          component={asyncLoad2(import('pages/blog/edit'))}
        />
        <Route component={asyncLoad2(import('pages/error'))} />
      </Switch>
    </Layout>
  </Route>
);
