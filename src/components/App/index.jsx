import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Home, Admin } from '../../components';

const App = (props) => {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route exact path="/" component={Home} />
    </Switch>
  )
}

export default withRouter(App);