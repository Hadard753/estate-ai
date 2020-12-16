import React from 'react';

import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { Colors } from '../../styles/theme';

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

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container direction="row" justify="center">
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h3" gutterBottom>
                        Welcome to React starter template
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        This template meant to get you up and running as fast as possible,
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        allowing you and your team to focus on your business logic.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Our stack: React, Redux, Material-ui, Node, Mongo, Dockers
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
}
