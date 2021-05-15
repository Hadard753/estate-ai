import React from 'react';

export enum GroupEnum {
    A="#e93e3a",
    B="#f3903f",
    C="#fff33b",
    D="#33e93b",
}

interface MapSpotProps {
    lat: number,
    lng: number,
    radius?: number,
    onMouseEnter?: () => {},
    onMouseLeave?: () => {},
    onClick?: (event: any) => {},
    text?: string,
    group: GroupEnum,
}

const MapSpot = (props: MapSpotProps) => {
    <div
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={props.onClick}
        style={{backgroundColor: props.group, width: props.radius+'px', height: props.radius+'px', borderRadius: props.radius+'px', opacity: '0.5'}}>
        <div>{props.text}</div>
    </div>
}

MapSpot.defaultProps = {
    radius: 10,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: (event: any) => {},
    text: '',
    group: GroupEnum.A,
}

export default MapSpot;