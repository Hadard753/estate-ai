// @material-ui/icons
import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

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
        <Card className={classes.root} variant="outlined" style={{backgroundColor: getBackgroundColor(props.data["PRECENTAGE_SCORE"]), width: '95%', margin: '10px'}}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            General Asset Score
            </Typography>
            <Typography variant="h5" component="h2">
            {props.data["PRECENTAGE_SCORE"]}
            </Typography>
        </CardContent>
        </Card>
    </React.Fragment>);
}
