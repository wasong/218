import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './Login'

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  </div>
)

export default Routes
