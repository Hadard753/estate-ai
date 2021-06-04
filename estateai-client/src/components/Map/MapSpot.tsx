import ReactTooltip from 'react-tooltip';
import React, { useEffect, useState } from 'react';

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
    neighborhood: Neighborhood,
    bedrooms?: string,
    scoreType?: string
}

const MapSpot = (props: MapSpotProps) => {
    const getScore = (n: Neighborhood) => {
        if(props.bedrooms == "All") return { 
            overallScore: n.GENERAL_SCORE,
            precentageScore: n.PRECENTAGE_SCORE,
            percisionScore: n.PERCISION_SCORE,
            trendScore: n.TREND_SCORE
        }
        else if(props.bedrooms == "One")return  { 
            overallScore: n.ONEBR_GENERAL_SCORE,
            precentageScore: n.ONEBR_PRECENTAGE_SCORE,
            percisionScore: n.ONEBR_PERCISION_SCORE,
            trendScore: n.ONEBR_TREND_SCORE
        }
        else if(props.bedrooms == "Two") return { 
            overallScore: n.TWOBR_GENERAL_SCORE,
            precentageScore: n.TWOBR_PRECENTAGE_SCORE,
            percisionScore: n.TWOBR_PERCISION_SCORE,
            trendScore: n.TWOBR_TREND_SCORE
        }
        else if(props.bedrooms == "Three") return { 
            overallScore: n.THREEBR_GENERAL_SCORE,
            precentageScore:n.THREEBR_PRECENTAGE_SCORE,
            percisionScore: n.THREEBR_PERCISION_SCORE,
            trendScore: n.THREEBR_TREND_SCORE
        }
        else if(props.bedrooms == "Four") return { 
            overallScore: n.FOURBR_GENERAL_SCORE,
            precentageScore:n.FOURBR_PRECENTAGE_SCORE,
            percisionScore: n.FOURBR_PERCISION_SCORE,
            trendScore: n.FOURBR_TREND_SCORE
        }
        else return{ 
            overallScore: n.FIVEBR_GENERAL_SCORE,
            precentageScore: n.FIVEBR_PRECENTAGE_SCORE,
            percisionScore: n.FIVEBR_PERCISION_SCORE,
            trendScore: n.FIVEBR_TREND_SCORE
        }
      }
      const score = getScore(props.neighborhood) 
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
        <Typography>{props.neighborhood.NEIGHBORHOOD}</Typography>
        <Typography>{props.bedrooms} Bedrooms</Typography>
        <Typography>Overall Score: {score.overallScore}</Typography>
        <Typography>Percentage Increase Score: {score.precentageScore}</Typography>
        <Typography>Precision Score: {score.percisionScore}</Typography>
        <Typography>Sales Score: {score.trendScore}</Typography>
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