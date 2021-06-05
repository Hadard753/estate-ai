import React, { useState } from 'react';

// examples:
import SimpleMap from './SimpleMap';

const HeatMap = () => {
    const [year, setYear] = useState(2021);
    const [bedrooms, setBedrooms] = useState("All");
    const [scoreType, setScoreType] = useState("By overall");

    return (
        <SimpleMap
            year={year} scoreType={scoreType} bedrooms={bedrooms} setYear={setYear} setBedrooms={setBedrooms} setScoreType={setScoreType}
            defaultZoom={13}
            defaultCenter={{ lat: 32.0854267, lng: 34.8422654 }}
        />
    );
}

export default HeatMap;