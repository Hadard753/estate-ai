import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SpeedDial from '@material-ui/lab/SpeedDial';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    bottom: '100px',
    left: theme.spacing(1),
  },
}));

export default function SearchBtn({ onClick }: any) {
  const classes = useStyles();

  return (
      <SpeedDial
        ariaLabel="Predict your asset revenue"
        className={classes.speedDial}
        hidden={false}
        icon={<SearchIcon />}
        onClose={()=>{}}
        onOpen={onClick}
        open={false}
      />
  );
}