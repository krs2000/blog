import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Home, Admin, Post} from '../../components';

const App = (props) => {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route exact path="/post/:id"  render={(props) => <Post {...props}  />} />
      <Route exact path="/" component={Home} />
    </Switch>
  )
}

export default withRouter(App);