import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Toolbar, makeStyles, CssBaseline, Button, Box, Grid, TextField } from '@material-ui/core';
import GoogleMapWrapper from './../googlemaps/GoogleMapWrapper';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: 'url("https://pix10.agoda.net/hotelImages/548/5482932/5482932_18081610470067487153.jpg?s=1024x768")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    flexGrow: 1,
  },
  card: {
    textAlign: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.6)',
    borderRadius: 16
  },
  btn: {
    margin: 10
  },
  map: {
    margin: 10
  },
  space: {
    marginLeft: 50
  }
}));

export default function ReccomendedByZone() {
  function navigate(to: string) {
    history.push(to);
  }
  let history = useHistory();
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Typography variant="h3" className={classes.space} gutterBottom>
          Reccomendedation By Zone
        </Typography>

        <Grid container alignContent='flex-start' direction='row' spacing={2} >

          <Grid item className={classes.space} alignContent='center' alignItems='center' direction='column' spacing={2} justify='center' xs={3}>
            <Typography variant="h6" gutterBottom >
              The following map will present to you the most recomendded areas for potential profit, feel free to zoom in/out for a specfic city/neighberhood
              You can also search a specfic zone
            </Typography>
          </Grid>

          <Grid item direction='column' xs={8} >

            <Grid item direction='row'>
              <TextField className={classes.btn} label="City" variant="filled" />
              <TextField className={classes.btn} label="Neigberhood" variant="filled" />
            </Grid>

            <GoogleMapWrapper width='71%' height='84%' ></GoogleMapWrapper>
          </Grid>

        </Grid>
      </div>
    </>
  );
}
