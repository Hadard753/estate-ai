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
    data: Object,
}

export default function Prediction(props: DistancesProps) {
    const classes = useStyles();
    return (
    <React.Fragment>
        <Card className={classes.root} variant="outlined" style={{backgroundColor: getBackgroundColor(props.data["PRECENTAGE_SCORE"]), width: '100%', marginTop: '10px', marginBottom: '10px', height: '20ch'}}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            General Asset Score
            </Typography>
            <Typography variant="h2" component="h2">
            {props.data["PRECENTAGE_SCORE"]}
            <TrendingUpIcon style={{ width: '5ch', height: '5ch',float: "right"}}/>
            </Typography>
        </CardContent>
        </Card>
    </React.Fragment>);
}
