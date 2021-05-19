import React from 'react';
import ReactTooltip from 'react-tooltip';
import Grid from '@material-ui/core/Grid';

import { GroupToColorDict } from '../../models/GroupEnum';
import { Neighborhood } from '../../models/neighborhood';
import { Typography } from '@material-ui/core';

const ReactTooltipAny = ReactTooltip as any;

interface MapSpotProps {
    lat: number,
    lng: number,
    radius?: number,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    onClick?: (event: any) => void,
    text?: string,
    group: "A" | "B" | "C" | "D" | "0",
    neighborhood: Neighborhood
}

const MapSpot = (props: MapSpotProps) => {
    return <div>
        <a data-tip data-for={props.neighborhood.NEIGHBORHOOD_ID.toString()}>
            <div
            onClick={props.onClick}
            style={{
                backgroundColor: GroupToColorDict[props.group],
                width: props.radius+'px', height: props.radius+'px',
                borderRadius: props.radius+'px',
                opacity: '0.5', textAlign: "center", fontSize: "15px",
                display: "flex", justifyContent: "center", alignContent: "center",
                flexDirection: "column"}}>
                {props.text}
            </div>
        </a>
        <ReactTooltipAny id={props.neighborhood.NEIGHBORHOOD_ID.toString()} aria-haspopup='true' role='example' type="info">
        <Typography variant="h6">Neighberhood scores</Typography>
        <Typography>{props.neighborhood.NEIGHBORHOOD}</Typography>
        <Typography>Overall Score: {props.neighborhood.GENERAL_SCORE}</Typography>
        <Typography>Percentage Increase Score: {props.neighborhood.PRECENTAGE_SCORE}</Typography>
        <Typography>Precision Score: {props.neighborhood.PERCISION_SCORE}</Typography>
        <Typography>Sales Score: {props.neighborhood.TREND_SCORE}</Typography>
        </ReactTooltipAny>
    </div>;
}

MapSpot.defaultProps = {
    radius: 10,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: (event: any) => {},
    text: '',
    group: "A",
}

export default MapSpot;
/**
 * <a data-tip data-for='global'> σ`∀´)σ </a>
<a data-tip data-for='global'> (〃∀〃) </a>
<ReactTooltip id='global' aria-haspopup='true' role='example'>
 <p>This is a global react component tooltip</p>
 <p>You can put every thing here</p>
 <ul>
   <li>Word</li>
   <li>Chart</li>
   <li>Else</li>
 </ul>
</ReactTooltip>
 */