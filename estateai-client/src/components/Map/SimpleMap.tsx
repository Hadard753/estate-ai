
import GoogleMapReact from 'google-map-react';
import React from 'react';

import neighborhoods from '../../assets/neighborhoods.json';
import { Neighborhood } from '../../models/neighborhood';
import MapSpot from './MapSpot';

interface SimpleMapProps {
    defaultCenter?: any,
    defaultZoom?: number,
    bedrooms?: string
}

const SimpleMap = (props: SimpleMapProps) => {
  const getScore = (n: Neighborhood) => {
    switch(props.bedrooms) {
      case "All": return n.GENERAL_SCORE;
      case "One": return n.ONEBR_GENERAL_SCORE;
      case "Two": return n.TWOBR_GENERAL_SCORE;
      case "Three": return n.THREEBR_GENERAL_SCORE;
      case "Four": return n.FOURBR_GENERAL_SCORE;
      default: return "0";
    }
  }
  return (
    <div style={{ height: '88vh', width: '100vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAwNtnyyfWcM_TyD7m6WImqsL2Uae-x_5M' }}
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
      >
        {neighborhoods.map((n: any) =>{
          const score = getScore(n);
          return (<MapSpot
          lat={n.LAT}
          key={n.NEIGHBORHOOD_ID}
          lng={n.LONG}
          onClick={() => console.log('navigate to: ',n)}
          text={n.NEIGHBORHOOD}
          group={score}
          radius={100}
          neighborhood={n}
        />)})}
      </GoogleMapReact>
    </div>
  );
}


SimpleMap.defaultProps = {
  defaultCenter: {
    lat: 32.0879267,
    lng: 34.8322654
  },
  defaultZoom: 13
};

export default SimpleMap;