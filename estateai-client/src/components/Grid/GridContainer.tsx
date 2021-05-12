import React from 'react';

import Grid from '@material-ui/core/Grid';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset",
  },
};

const useStyles = makeStyles(styles);

export default function GridContainer(props: {children: any}) {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}