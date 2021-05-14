import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

// examples:
import SimpleMap from './SimpleMap';

const HeatMap = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch('places.json')
      .then((response) => response.json())
      .then((data) => setPlaces(data.results));
  }, [])

const data = places.map((place: any) => ({
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
    weight: Math.floor(Math.random() * Math.floor(5)),
}));
const heatmapData = {
    positions: data,
    options: {
        radius: 20,
        opacity: 1,
    },
};

return (
    <React.Fragment>
    {!isEmpty(places) && (
        <SimpleMap
        defaultZoom={10}
        defaultCenter={{lat: 32.0879267, lng: 34.8322654}}
        heatmap={heatmapData}
        bootstrapURLKeys={{
            key: 'AIzaSyAwNtnyyfWcM_TyD7m6WImqsL2Uae-x_5M',
            libraries: ['visualization'],
        }}
        />
    )}
    </React.Fragment>
);
}

export default HeatMap;