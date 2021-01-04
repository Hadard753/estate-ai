//@ts-nocheck
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, makeStyles, CssBaseline, Button, Grid, TextField } from '@material-ui/core';
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

  const [showingInfoWindow, setshowingInfoWindow] = useState(false);
  const [getposition, setgetposition] = useState({});
  const [cityFoundLat, setcityFoundLat] = useState();
  const [cityFoundLng, setcityFoundLng] = useState();
  const [zoom, setzoom] = useState(8);


  const togglewindow = () => {
    setshowingInfoWindow(!showingInfoWindow)
}

const positions = [
  { lat: 31.0461, lng: 34.8516, weight: 4 },
  { lat: 31.0470, lng: 34.8516, weight: 15 },
  { lat: 31.0500, lng: 34.8516, weight: 5 },
  { lat: 31.0550, lng: 34.8516, weight: 10 }
]

const citiescordinates = [
  { name: "raanana" , lat: 32.184448, lng: 34.87076},
  { name: "jerusalem", lat: 31.771959, lng: 35.217018},
  { name: "ashdod", lat: 31.801447	, lng: 	34.643497},
]

const cityEntered = (event: React) => {
  const found = citiescordinates.find((data => data.name == event.target.value))
  if (found)
   {
    setcityFoundLat(found.lat)
    setcityFoundLng(found.lng)
    setzoom(13)
   }
  }

const israelView = (event: React) => {
    setcityFoundLat(31.0461)
    setcityFoundLng(34.8516)
    setzoom(8)
   }

const setMarker = (map : any, b: any, event: any) => {
  togglewindow()
  setgetposition(event.latLng)
}


  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Typography variant="h3" className={classes.space} gutterBottom>
          Reccomendedation By Zone
        </Typography>

        <Grid container alignContent='flex-start' direction='row' spacing={2} >

          <Grid item className={classes.space} alignContent='center' alignItems='center' direction='column' spacing={2} justify='center' xs={3}>
            <Typography variant="h6" gutterBottom>
              The following map will present to you the most recomendded areas for potential profit, feel free to zoom in/out for a specfic city/neighberhood
              You can also search a specfic zone
            </Typography>
          </Grid>

          <Grid item direction='column' xs={8} >

            <Grid item direction='row'>
              <TextField className={classes.btn} label="City" variant="filled" onChange={(e) => cityEntered(e)} />
              <Button className={classes.btn} size="large" onClick={(e) => israelView(e)}>Back to Israel view</Button>
            </Grid>

            <GoogleMapWrapper width='70%' height='78%' mapClicked={setMarker} showingInfoWindow={showingInfoWindow} clickedPosition={getposition} heatmapPositions={positions}
            citySearchedLat={cityFoundLat} citySearchedLng={cityFoundLng} zoom={zoom}
            
            ></GoogleMapWrapper>
          </Grid>

        </Grid>
      </div>
    </>
  );
}
