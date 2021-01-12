//@ts-nocheck
import React, { EventHandler, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, HeatMap } from 'google-maps-react';
import { applicationConstants } from '../../constants';


const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative',
};


interface GoogleMapWrapperProps {
  google: any,
  height?: string,
  width?: string,
  position?: string,
  mapClicked?: mapEventHandler,
  infoWindoVisible?: boolean,
  clickedPosition?: Function,
  heatmapPositions?: Object,
  citySearchedLat?: number,
  citySearchedLng?: Object,
  zoom?: number 
}

function GoogleMapWrapper(props: GoogleMapWrapperProps) {

  mapStyles.height = props.height || mapStyles.height;
  mapStyles.width = props.width || mapStyles.width;
  mapStyles.position = props.position || mapStyles.position;

  return (
    
    <Map
      google={props.google}
      style={mapStyles}
      initialCenter={{ lat: 31.0461, lng: 34.8516, }}
      zoom={props.zoom}
      onClick={props.mapClicked}
      center={{ lat: props.citySearchedLat, lng: props.citySearchedLng }}
    >
      <InfoWindow
        position={props.clickedPosition}
        visible={props.infoWindoVisible}
      >
        <div>
          <h4>Zone Score </h4>
          <h4>Average profit made </h4>
        </div>
      </InfoWindow>

      <HeatMap
        opacity={0.4}
        positions={props.heatmapPositions}
      // radius={10}
      />

    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: applicationConstants.googleApiKey,
  libraries: ["visualization"]
})(GoogleMapWrapper);