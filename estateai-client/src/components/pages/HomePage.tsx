import React from 'react';

// import GoogleMapWrapper from '../googlemaps/GoogleMapWrapper';
// import HeatMap from '../Map/HeatMap';
import SimpleMap from '../Map/SimpleMap';

export default function HomePage(props: any) {
    return (
        <React.Fragment>
            <div>Home Page</div>
            <SimpleMap />
        </React.Fragment>
    )
}