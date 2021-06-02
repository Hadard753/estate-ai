import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

import placesRequest from '../../assets/places.json';
// examples:
import SimpleMap from './SimpleMap';

const HeatMap = () => {
    const [places, setPlaces] = useState(placesRequest.results);
    const [year, setYear] = useState(2021);
    const [bedrooms, setBedrooms] = useState("All");
    const [scoreType, setScoreType] = useState("By overall");

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
                    year={year} scoreType={scoreType} bedrooms={bedrooms} setYear={setYear} setBedrooms={setBedrooms} setScoreType={setScoreType}
                    defaultZoom={13}
                    defaultCenter={{ lat: 32.0854267, lng: 34.8422654 }}

                />
            )}
        </React.Fragment>
    );
}

export default HeatMap;