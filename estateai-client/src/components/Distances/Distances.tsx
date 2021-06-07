// @material-ui/icons
import React from 'react';
import ReactTooltip from 'react-tooltip';

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
import { getBackgroundColor } from '../../utils';

const useStyles = makeStyles(styles as any);
const ReactTooltipAny = ReactTooltip as any;

interface DistancesProps {
    data: Object,
    improvements: Object
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
    debugger;
    return (
    <React.Fragment>
        {
        Object.keys(props.data).map(key => (
            <div key={key}>
                <a data-tip data-for={key}>
                    <Card className={classes.root} variant="outlined" style={{backgroundColor: getBackgroundColor(props.data[key]), width: '30ch', margin: '10px'}}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {key}
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {props.data[key]}
                        {renderIcon(key)}
                        </Typography>
                    </CardContent>
                    </Card>
                </a>
                <ReactTooltipAny id={key} aria-haspopup='true' role='example' type="info">
                    <Typography>For improvement of this feature try the following neighborhoods: </Typography>
                    {
                        props.improvements[key] && props.improvements[key].map(n => (
                            <li>{n.name} - {n.score}</li>
                        ))
                    }
                </ReactTooltipAny>
            </div>
                    ))
        }
    </React.Fragment>);
}
