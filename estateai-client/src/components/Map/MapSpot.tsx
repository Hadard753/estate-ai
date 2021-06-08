import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { Typography } from '@material-ui/core';

import { GroupToColorDict } from '../../models/GroupEnum';
import { Neighborhood } from '../../models/neighborhood';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { forEach } from 'lodash';

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
    neighborhood: any,
    bedrooms?: string,
    scoreType?: string,
    userRequest?: any
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

    const getNumber = (score) => {
        if (score == "D") return 1;
        if (score == "C") return 2;
        if (score == "B") return 3;
        if (score == "A") return 4;
        return 0;
    }
    const score = getScore(props.neighborhood);
    const calculateOpacity = () => {
        const neighborhood = props.neighborhood;
        const userRequest = props.userRequest;
        let opacity = 0.2;

        if(userRequest) {
            // option 1 - scale against user weights
            const userWeights = [getNumber(userRequest["beach"]),getNumber(userRequest["bus"]),getNumber(userRequest["highway"]),getNumber(userRequest["school"]),getNumber(userRequest["train"])]
            let sum = 0
            userWeights.forEach((weight) => {
                sum+= weight;
            })
            for (let i=0;i<userWeights.length;i++) {
                userWeights[i] = userWeights[i]/sum
            }
            const neighborhoodScores = [getNumber(neighborhood.distances["beach"]),getNumber(neighborhood.distances["bus"]),getNumber(neighborhood.distances["highway"]),getNumber(neighborhood.distances["school"]),getNumber(neighborhood.distances["train"])]
            for (let i=0;i<neighborhoodScores.length;i++) {
                neighborhoodScores[i] = neighborhoodScores[i]*userWeights[i]
            }
            let sumScore = 0
            neighborhoodScores.forEach((weight) => {
                sumScore+= weight;
            })

            return sumScore/3;

            // option 2 - const scale
            // Object.keys(userRequest).forEach(feature => {
            //     if (neighborhood.distances[feature] <= userRequest[feature]) {
            //         const userWant = getNumber(userRequest[feature])
            //         const weHave = getNumber(neighborhood.distances[feature])
            //         const reduceTo = weHave - userWant
            //         for (let i=0;i<reduceTo+1;i++) {
            //             opacity += 0.1;
            //         }
            //     }
            // })
        } else {
            return '0.5'
        }
        return opacity.toString();

    }
    return <div>
        <a data-tip data-for={props.neighborhood.NEIGHBORHOOD_ID.toString()}>
            <div
            onClick={props.onClick}
            style={{
                backgroundColor: GroupToColorDict[props.group],
                width: props.radius+'px', height: props.radius+'px',
                borderRadius: props.radius+'px',
                opacity: calculateOpacity(),
                textAlign: "center", fontSize: "15px",
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
