import React from 'react';
import { Route, Switch } from 'react-router-dom'

import LoginPage from './component/login'
import SignupPage from './component/signup';
import HomePage from './component/home';
import OrganisationComponent from './component/organisation';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route path='/new' component={SignupPage} />
      <Route path='/home' component={HomePage} />
      <Route path='/edit' component={OrganisationComponent} />
    </Switch>
  );
}

export default App;
