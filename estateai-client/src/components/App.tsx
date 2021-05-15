import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Routes from './Routes';
import Footer from './Site/Footer';
import Header from './Site/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));

function App() {
  const classes = useStyles();
  const [bedrooms, setBedrooms] = useState("All");

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header bedrooms={bedrooms} setBedrooms={setBedrooms}/>
      <Router>
          <Routes bedrooms={bedrooms}/>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
