// @material-ui/icons
import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

// core components
import styles from '../../assets/cardStyle';
import { getBackgroundColor } from '../../utils';

const useStyles = makeStyles(styles as any);

interface DistancesProps {
    roomNum: string,
    data: Object,
}

export default function Prediction(props: DistancesProps) {
    
    const getScore = () => {
        switch (props.roomNum) {
        case "All": return props.data["PRECENTAGE_SCORE"];
        case "One": return props.data["ONEBR_PRECENTAGE_SCORE"];
        case "Two": return props.data["TWOBR_PRECENTAGE_SCORE"];
        case "Three": return props.data["THREEBR_PRECENTAGE_SCORE"];
        case "Four": return props.data["FOURBR_PRECENTAGE_SCORE"];
        case "Five": return props.data["FIVEBR_PRECENTAGE_SCORE"];
      }
    }
    const classes = useStyles();
    return (
    <React.Fragment>
        <Card className={classes.root} variant="outlined" style={{backgroundColor: getBackgroundColor(getScore()), width: '100%', marginTop: '10px', marginBottom: '10px', height: '20ch'}}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Asset Score
            </Typography>
            <Typography variant="h2" component="h2">
            {getScore()}
            <TrendingUpIcon style={{ width: '5ch', height: '5ch',float: "right"}}/>
            </Typography>
        </CardContent>
        </Card>
    </React.Fragment>);
}
