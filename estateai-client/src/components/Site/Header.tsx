import React from 'react';

import { Button, ButtonGroup } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: "#0000004d"
  },
  header: {
    background: '#5c6f68',
    color: '#fff'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
}));

interface HeaderProps {
  bedrooms: string,
  setBedrooms: any,
  setYear: any,
  scoreType: string,
  year: number,
  setScoreType: any
}

export default function Header(props: HeaderProps) {
  const classes = useStyles();
  const bedroomsOptions = ["All", "One", "Two", "Three", "Four","Five"];
  const scoreOptions = ["By overall", "By percentage increase", "By precision", "By sales"];

  return (
    <div>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Estate-AI
          </Typography>
          <span>Year:</span>
          <Input
            style={{ color: 'white', marginRight: '15%', marginLeft: '4px', width: '70px', textAlign: 'center', paddingLeft: '5px' }}
            inputProps={{ type: 'number', min: 2006, max: 2022}}
            value={props.year}
            onChange={(e) => props.setYear(e.target.value)}/>
          <span>Score type:</span>
          <div className={classes.search}>
            <ButtonGroup size="small" aria-label="small outlined button group">
              {scoreOptions.map(option => (
                <Button key={option} className={option === props.scoreType ? classes.active : ''} onClick={() => props.setScoreType(option)}>{option}</Button>
              ))}
            </ButtonGroup>
          </div>
          <span>Bedrooms:</span>
          <div className={classes.search}>
            <ButtonGroup size="small" aria-label="small outlined button group">
              {bedroomsOptions.map(option => (
                <Button key={option} className={option === props.bedrooms ? classes.active : ''} onClick={() => props.setBedrooms(option)}>{option}</Button>
              ))}
            </ButtonGroup>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
