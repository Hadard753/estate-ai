import React from 'react';

// import GoogleMapWrapper from '../googlemaps/GoogleMapWrapper';
// import HeatMap from '../Map/HeatMap';
import SimpleMap from '../Map/SimpleMap';

export default function HomePage(props: {bedrooms: string}) {
    return (
        <React.Fragment>
            <SimpleMap bedrooms={props.bedrooms}/>
        </React.Fragment>
    )
}