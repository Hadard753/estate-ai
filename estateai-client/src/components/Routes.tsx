import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';

export const RoutesList = [
    {label: 'Result', path: '/result', component: SearchResultPage},
    {label: 'Home', path: '/', component: HomePage},
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