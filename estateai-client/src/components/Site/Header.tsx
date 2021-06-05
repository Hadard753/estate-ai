import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: "#0000004d"
  },
  header: {
    background: 'green',
    color: '#fff',
    textAlign: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      color: 'inherit',
      underline: 'none'

    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.4),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.4),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }
  ,
  a: {
    color: 'inherit'
  }
}));

interface HeaderProps {
}

export default function Header(props: HeaderProps) {
  const classes = useStyles();

  return (
    <div style={{ flex: 0 }}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap >
            <a className={classes.a} href="/HomePage"> Estate-AI</a>
          </Typography>

          <Typography className={classes.title} variant="h6" noWrap >
            <a className={classes.a} href="/HeatMap"> Heat Map </a>
          </Typography>

          <Typography className={classes.title} variant="h6" noWrap >
            <a className={classes.a} href="/Search"> Search by property </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
