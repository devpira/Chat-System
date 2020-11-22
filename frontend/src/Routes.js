import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import  AuthRequiredRoute  from './shared/Routes';

import Home from './views/Home'

const Routes = () => {
  return (
    <Switch>
      <AuthRequiredRoute
        component={Home}
        exact
        path="/"
      />



      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;