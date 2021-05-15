
import GoogleMapReact from 'google-map-react';
import React from 'react';

import neighborhoods from '../../assets/neighborhoods.json';
import MapSpot from './MapSpot';

interface SimpleMapProps {
    defaultCenter?: any,
    defaultZoom?: number,
}

const SimpleMap = (props: SimpleMapProps) => {
  return (
    <div style={{ height: '800px', width: '800px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAwNtnyyfWcM_TyD7m6WImqsL2Uae-x_5M' }}
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
      >
        {neighborhoods.map((n: any) =>(<MapSpot
          lat={n.LAT}
          key={n.NEIGHBORHOOD_ID}
          lng={n.LONG}
          onMouseEnter={() => console.log('entering: ',n)}
          onMouseLeave={() => console.log('leaving: ',n)}
          onClick={() => console.log('navigate to: ',n)}
          text={n.NEIGHBORHOOD}
          group={["A","B","C","D", "0"].includes(n.GENERAL_SCORE) ? n.GENERAL_SCORE : "0"}
          radius={100}
          neighborhood={n}
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
  defaultZoom: 13
};

export default SimpleMap;