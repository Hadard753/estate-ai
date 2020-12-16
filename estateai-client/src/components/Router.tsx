import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Home from './home/Home';

export const Routes = [
    {label: 'Login', path: '/login', component: () => <div>Login</div>},
    {label: 'Register', path: '/register', component: () =><div>Register</div>},
    {label: 'Home', path: '/', component: Home},
]

export default function App() {
  return (
    <Router>
        <Switch>
            {Routes.map(r => (
                <Route path={r.path} component={r.component} />
            ))}
        </Switch>
    </Router>
  );
}