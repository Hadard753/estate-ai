// @material-ui/icons
import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from '../../assets/cardStyle';

const useStyles = makeStyles(styles as any);

interface DistancesProps {
    data: Object,
}

export default function Prediction(props: DistancesProps) {
    const classes = useStyles();
    const getBackgroundColor = score => {
        switch (score) {
            case 'A': return '#4fa34c';
            case 'B': return '#ffec00';
            case 'C': return '#ff8d00de';
            case 'D': return '#e0403d';
            default: return '#737373';
        }
    }
    return (
    <React.Fragment>
        <Card className={classes.root} variant="outlined" style={{backgroundColor: getBackgroundColor(props.data["TREND_SCORE"]), width: '95%', margin: '10px'}}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            General Asset Score
            </Typography>
            <Typography variant="h5" component="h2">
            {props.data["TREND_SCORE"]}
            </Typography>
        </CardContent>
        </Card>
    </React.Fragment>);
}
