import React, { FunctionComponent } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { Colors } from '../styles/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '30px',
},
paper: {
    padding: theme.spacing(2),
    textAlign: 'start',
    backgroundColor: Colors.secondary,
    color: Colors.text,
  },
}));

export const BodyWrapper: FunctionComponent<{}> = ({children}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center">
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {children}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default BodyWrapper;