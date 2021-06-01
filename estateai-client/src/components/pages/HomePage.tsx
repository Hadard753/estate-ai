import React from 'react';

import SimpleMap from '../Map/SimpleMap';

export default function HomePage(props: {bedrooms: string, year: number}) {
    return (
        <React.Fragment>
            <SimpleMap bedrooms={props.bedrooms} year={props.year}/>
        </React.Fragment>
    )
}