
import GoogleMapReact from 'google-map-react';
import React from 'react';

import RoomIcon from '@material-ui/icons/Room';

interface MapProps {
  pointer?: any,
  defaultZoom?: number,
}

const SpotDiv = (props: {lat: string, lng: string}) => (
  <div>
      <RoomIcon style={{ width: '50px', height: '50px', color: 'red' }}/>
  </div>
);

const Map = (props: MapProps) => {
  return (
    // <div style={{ width: '95%', margin: '10px' }} >
      <GoogleMapReact
        defaultCenter={props.pointer}
        defaultZoom={props.defaultZoom}
        >
        <SpotDiv lat={props.pointer.lat} lng={props.pointer.lng}/>
      </GoogleMapReact>
    // </div>
  );
}

Map.defaultProps = {
  pointer: {
    lat: 32.0879267,
    lng: 34.8322654
  },
  defaultZoom: 14,
};

export default Map;