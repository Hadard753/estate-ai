
import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';

import places from '../../assets/sales.json';

const AnyReactComponent = (props: any) => <div onMouseEnter={props.onMouseEnter}>{props.text}</div>;

interface SimpleMapProps {
    defaultCenter?: any,
    defaultZoom?: number,
}

const SimpleMap = (props: SimpleMapProps) => {
  return (
    <div style={{ height: '500px', width: '500px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAwNtnyyfWcM_TyD7m6WImqsL2Uae-x_5M' }}
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
      >
        {places.slice(1,7).map((place: any) =>(<AnyReactComponent
          lat={place.LATITUDE}
          lng={place.LONGITUDE}
          onMouseEnter={() => console.log('entering: ',place)}
          onMouseLeave={() => console.log('leaving: ',place)}
          onClick={() => console.log('navigate to: ',place)}
          text="My Marker"
        />))}
      </GoogleMapReact>
    </div>
  );
}


SimpleMap.defaultProps = {
  defaultCenter: {
    lat: 32.0879267,
    lng: 34.8322654
  },
  defaultZoom: 11
};

export default SimpleMap;