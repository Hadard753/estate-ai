import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SimpleMap from './Map/SimpleMap';
import SearchResultPage from './pages/SearchResultPage';

export const RoutesList = [
    {label: 'Result', path: '/result', component: SearchResultPage},
    {label: 'Home', path: '/', component: SimpleMap},
]

export default function Routes(props: { bedrooms: string }) {
  return (
        <Switch>
            {RoutesList.map(r => (
                <Route key={r.label} path={r.path} component={() => <r.component {...props} />} />
            ))}
        </Switch>
  );
}