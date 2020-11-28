import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import  AuthRequiredRoute  from './shared/Routes';

import ChatApp from './views'

const Routes = () => {
  return (
    <Switch>
      <AuthRequiredRoute
        component={ChatApp}
        exact
        path="/"
      />



      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;