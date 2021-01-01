import React from 'react';
import { Map, GoogleApiWrapper, IMapProps } from 'google-maps-react';
import { Typography, Toolbar, makeStyles, CssBaseline, Button, Box, Grid, TextField } from '@material-ui/core';

const mapStyles = {
  width: '100%',
  height: '100%'
};

interface GoogleMapWrapperProps {
  google: any,
  height?: string,
  width?: string
}

function GoogleMapWrapper(props: GoogleMapWrapperProps) {
  mapStyles.height = props.height || mapStyles.height;
  mapStyles.width = props.width || mapStyles.width;

  return (
    <Map
      google={props.google}
      style={mapStyles}
      initialCenter={{ lat: 31.0461, lng: 34.8516, }}
      // zoom={8}
    />
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAfUgH5eeVvn-TG9Cmrx7BTDUNV22NfORc'
})(GoogleMapWrapper);