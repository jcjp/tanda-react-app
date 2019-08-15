import React from 'react';
import { Route, Switch } from 'react-router-dom'

import LoginPage from './component/login'
import SignupPage from './component/signup';
import HomePage from './component/home';
import OrganisationPage from './component/organisation';
import ForgotPasswordPage from './component/forgot';
import ShiftPage from './component/shifts';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route path='/new' component={SignupPage} />
      <Route path='/home' component={HomePage} />
      <Route path='/edit' component={OrganisationPage} />
      <Route path='/forgot' component={ForgotPasswordPage} />
      <Route path='/shifts' component={ShiftPage} />
    </Switch>
  );
}

export default App;
