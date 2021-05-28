//@ts-nocheck
import React, { useState,useEffect } from 'react';
import { Typography, makeStyles, CssBaseline, Button, Grid, TextField } from '@material-ui/core';
import GoogleMapWrapper from './../googlemaps/GoogleMapWrapper';
import {urlConstants } from '../../api_urls';
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';
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
  const [SearchedCity, setSearchedCity] = useState('');
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

  // window.google.maps.places.ComponentRestrictions = { country:'us' };
},[]);

const findCity = SearchedCity => {
  setSearchedCity(SearchedCity)
 geocodeByAddress(SearchedCity)  
  .then(results => getLatLng(results[0]))
  .then(latLng => { 
    console.log('Success', latLng);
    setcityFoundLat(latLng.lat);
    setcityFoundLng(latLng.lng);
    setzoom(13);
} ) 
  .catch(error => console.error('Error', error));
}

const searchOptions = {
  input: SearchedCity,
  // types: ['address'],
  componentRestrictions: {
    country : ['IL']
  }
}

const israelView = (event: React) => { 
    setcityFoundLat(31.0461)
    setcityFoundLng(34.8516)
    setzoom(8)
   }

const presentInfoWindo = (map : any, b: any, event: any) => { 
  togglewindow()
  setgetposition(event.latLng)
}
const togglewindow = () => { 
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

              <PlacesAutocomplete
            className={classes.btn}
            value={SearchedCity}
            onChange={setSearchedCity}
            onSelect={findCity}
            searchOptions={searchOptions}
      >
{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#bc9cdb', cursor: 'pointer' }
                  : { backgroundColor: '#bc9cdb', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>


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
