import React from 'react';

import Grid from '@material-ui/core/Grid';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  grid: {
    padding: "0 15px !important",
  },
};

const useStyles = makeStyles(styles);

export default function GridItem(props: any) {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}