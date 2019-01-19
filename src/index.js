import React from 'react';
import createHistory from 'history/createBrowserHistory';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';
import reducer from './reducers';

import store from './store';

import { App } from './components';

import '../resources/scss/style.scss';

ReactDOM.render(
  <Router history={createHistory()}>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route  path="/admin" component={App} />
        <Route path="/post/:id" component={App} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
