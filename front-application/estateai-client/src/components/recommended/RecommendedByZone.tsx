//@ts-nocheck
import React, { useState,useEffect } from 'react';
import { Typography, makeStyles, CssBaseline, Button, Grid, TextField } from '@material-ui/core';
import GoogleMapWrapper from './../googlemaps/GoogleMapWrapper';
import {urlConstants } from '../../api_urls';

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
  const classes = useStyles();

  const [showingInfoWindow, setshowingInfoWindow] = useState(false);
  const [getposition, setgetposition] = useState({});
  const [cityFoundLat, setcityFoundLat] = useState({});
  const [cityFoundLng, setcityFoundLng] = useState({});
  const [zoom, setzoom] = useState(8);
  const [heatmapPositions, setheatmapPositions] = useState({});
  const [isMapLoaded, setisMapLoaded] = useState(false);

useEffect(() => {
  fetch(urlConstants.heatmapcordURL)
  .then(response => response.json())
  .then(data => {
    setheatmapPositions(data.data);
    setisMapLoaded(true)
  });
},[]);

const citiescordinates = [ //"Search DB" need to be replaced with Google auto complete API with cordinations
  { name: "raanana" , lat: 32.184448, lng: 34.87076},
  { name: "jerusalem", lat: 31.771959, lng: 35.217018},
  { name: "ashdod", lat: 31.801447	, lng: 	34.643497},
]

const cityEntered = (event: React) => { //Was it right to place it here and not in "GoogleMapWrapper"?
  const found = citiescordinates.find((data => data.name === event.target.value))
  if (found)
   {
    setcityFoundLat(found.lat)
    setcityFoundLng(found.lng)
    setzoom(13)
   }
  }

const israelView = (event: React) => { //Was it right to place it here and not in "GoogleMapWrapper"?
    setcityFoundLat(31.0461)
    setcityFoundLng(34.8516)
    setzoom(8)
   }

const presentInfoWindo = (map : any, b: any, event: any) => { //Was it right to place it here and not in "GoogleMapWrapper"?
  togglewindow()
  setgetposition(event.latLng)
}
const togglewindow = () => { //Was it right to place it here and not in "GoogleMapWrapper"?
  setshowingInfoWindow(!showingInfoWindow)
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
            {isMapLoaded ? 
            <GoogleMapWrapper width='70%' height='78%' mapClicked={presentInfoWindo} infoWindoVisible={showingInfoWindow} clickedPosition={getposition} heatmapPositions={heatmapPositions}
            citySearchedLat={cityFoundLat} citySearchedLng={cityFoundLng} zoom={zoom}
            
            ></GoogleMapWrapper>

            :
            <div> Loading Map... </div>
         }
          </Grid>

        </Grid>
       
      
      </div>

    </>
  );
}
