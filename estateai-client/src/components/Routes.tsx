import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Home from './home/Home';

export const RoutesList = [
    {label: 'Login', path: '/login', component: Login},
    {label: 'Register', path: '/register', component: Register},
    {label: 'Home', path: '/', component: Home},
]

export default function Routes() {
  return (
        <Switch>
            {RoutesList.map(r => (
                <Route key={r.label} path={r.path} component={r.component} />
            ))}
        </Switch>
  );
}