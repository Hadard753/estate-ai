import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeatMap from './Map/HeatMap';
import QualityMap from './Map/QualityMap';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';

export const RoutesList = [
    {label: 'Result', path: '/result', component: SearchResultPage},
    {label: 'HeatMap', path: '/HeatMap', component: HeatMap},
    {label: 'QualityMap', path: '/QualityMap', component: QualityMap},
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