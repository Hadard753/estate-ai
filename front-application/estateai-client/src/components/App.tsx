import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import BodyWrapper from './BodyWrapper';
import Header from './header/Header';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <BodyWrapper >
          <Routes />
        </BodyWrapper>
      </Router>
    </div>
  );
}

export default App;
