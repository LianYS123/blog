import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import store from './store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import routes from './routes';
const app = (
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>
);

ReactDOM.render(app, document.querySelector('#root'));
