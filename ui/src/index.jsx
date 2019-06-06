import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { store } from '_common/stores';
import App from 'app/container';
import '_common/initializers';

import '_assets/favicons';
import '_assets/style.less';


const rootEl = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootEl
);
