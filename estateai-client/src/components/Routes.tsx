import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Home from './home/Home';
import Discover from './discover/Discover';
import AboutUs from "./aboutus/AboutUs";
import RecommendedByProperty from './recommended/RecommendedByProperty';
import RecommendedByZone from './recommended/RecommendedByZone';
import Calculated from "./calculated/Calculated";

export const RoutesList = [
    {label: 'Login', path: '/login', component: Login},
    {label: 'Register', path: '/register', component: Register},
    {label: 'Discover', path: '/discover', component: Discover},
    {label: 'AboutUs', path: '/aboutus', component: AboutUs},
    {label: 'RecommendedByProperty', path: '/recommendedbyproperty', component: RecommendedByProperty},
    {label: 'RecommendedByZone', path: '/recommendedbyzone', component: RecommendedByZone},
    {label: 'Calculated', path: '/Calculated', component: Calculated},
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