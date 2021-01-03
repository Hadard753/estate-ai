//@ts-nocheck
import React, { EventHandler, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, mapEventHandler, HeatMap, Polygon } from 'google-maps-react';

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
}

function GoogleMapWrapper(props: GoogleMapWrapperProps) {

  const [showingInfoWindow, setshowingInfoWindow] = useState(false);
  const [getposition, setgetposition] = useState({});

  mapStyles.height = props.height || mapStyles.height;
  mapStyles.width = props.width || mapStyles.width;
  mapStyles.position = props.position || mapStyles.position;

  const positions = [
    { lat: 31.0461, lng: 34.8516 , weight: 4},
    { lat: 31.0470, lng: 34.8516 ,weight: 15 },
    { lat: 31.0500, lng: 34.8516 ,weight: 5},
    { lat: 31.0550, lng: 34.8516 ,weight: 10}
  ]

  const togglewindow = (props) => {
      setshowingInfoWindow(!showingInfoWindow)
  }

  const setMarker = (map, b, event) => {
    togglewindow()
    setgetposition(event.latLng)
  }


  return (
    <Map
      google={props.google}
      style={mapStyles}
      initialCenter={{ lat: 31.0461, lng: 34.8516, }}
      zoom={8}
      onClick={setMarker}
    >
      <InfoWindow
        position={getposition}
        visible={showingInfoWindow}
        onClose={togglewindow}  >
        <div>
          <h3>Zone Name </h3>
          <h4>Zone Score </h4>
          <h4>Average profit made </h4>
        </div>
      </InfoWindow>

      <HeatMap
        opacity={0.4}
        positions={positions}
      // radius={10}
      />

    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAfUgH5eeVvn-TG9Cmrx7BTDUNV22NfORc',
  libraries: ["visualization"]
})(GoogleMapWrapper);