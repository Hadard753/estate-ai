// @material-ui/icons
import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import CallSplitIcon from '@material-ui/icons/CallSplit';
// nodejs library that concatenates classes
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import SchoolIcon from '@material-ui/icons/School';
import TrainIcon from '@material-ui/icons/Train';

// core components
import styles from '../../assets/cardStyle';

const useStyles = makeStyles(styles as any);

interface DistancesProps {
    data: Object,
}

export default function Distances(props: DistancesProps) {
    const classes = useStyles();
    const renderIcon = key => {
        switch (key) {
            case 'bus': return <DirectionsBusIcon style={{ width: '5ch', height: '5ch', float: 'right'}}/>;
            case 'train': return <TrainIcon style={{ width: '5ch', height: '5ch', float: 'right'}}/>;
            case 'school': return <SchoolIcon style={{ width: '5ch', height: '5ch', float: 'right'}}/>;
            case 'highway': return <CallSplitIcon style={{ width: '5ch', height: '5ch', float: 'right'}}/>;
            case 'beach': return <BeachAccessIcon style={{ width: '5ch', height: '5ch', float: 'right'}}/>;
            default: return null;
        }
    }
    const getBackgroundColor = score => {
        switch (score) {
            case 'A': return 'green';
            case 'B': return 'yellow';
            case 'C': return 'orange';
            case 'D': return 'red';
            default: return 'gray';
        }
    }
    return (
    <React.Fragment>
        {
            Object.keys(props.data).map(key => (
                <Card className={classes.root} variant="outlined" key={key} style={{backgroundColor: getBackgroundColor(props.data[key]), width: '30ch', margin: '10px'}}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {key}
                    </Typography>
                    <Typography variant="h5" component="h2">
                    {props.data[key]}
                    {renderIcon(key)}
                    </Typography>
                </CardContent>
                </Card>))
        }
    </React.Fragment>);
}
