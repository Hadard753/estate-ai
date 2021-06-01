import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Routes from './Routes';
import ScoreRoutes from './Routes';
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
  const [year, setYear] = useState(2021);
  const [bedrooms, setBedrooms] = useState("All");
  const [scoreType, setScoreType] = useState("By overall");

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header year={year} setYear={setYear} bedrooms={bedrooms} setBedrooms={setBedrooms} scoreType={scoreType} setScoreType={setScoreType}/>
      <Router>
          <Routes year={year} scoreType={scoreType} bedrooms={bedrooms} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
