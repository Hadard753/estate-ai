import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SimpleMap from './Map/SimpleMap';
import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';
import SearchPage from './pages/SearchPage';
import HeatMap from './Map/HeatMap';

export const RoutesList = [
    {label: 'Result', path: '/result', component: SearchResultPage},
   {label: 'HeatMap', path: '/HeatMap', component: HeatMap},
   {label: 'Search', path: '/Search', component: SearchPage},
   {label: 'Home', path: '/', component: HomePage},
]

export default function Routes() {
  return (
        <Switch>
            {RoutesList.map(r => (
                <Route key={r.label} path={r.path} component={() => <r.component />} />
            ))}
        </Switch>
  );
}