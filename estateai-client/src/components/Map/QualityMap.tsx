
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import ColorBar from 'react-color-bar';

import { Button, ButtonGroup, Grid, Tooltip, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { fade, makeStyles } from '@material-ui/core/styles';

import { urlConstants } from '../../api_urls';
import { Neighborhood } from '../../models/neighborhood';
import MapSpot from './MapSpot';

interface QualityMapProps {
  defaultCenter?: any,
  defaultZoom?: number,
  bedrooms?: string,
  year?: number,
  scoreType?: string,
  setYear?: any,
  setScoreType?: any,
  setBedrooms?: any
}

const useStyles = makeStyles((theme) => ({
  slider: {
    transform: 'scaleX(0.95)'
  },
  active: {
    backgroundColor: "#0000004d"
  },
  header: {
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
      width: 'auto',
    },
  }
}));

export const colorBarData = [
  {
    value: 0,
    color: '#4fa34c',
    legendLabel: 'A - Highly Recommended',
    tooltip: 'A - Highly Recommended',
  }, {
    value: 0,
    color: '#ffec00',
    legendLabel: 'B - Recommended',
    tooltip: 'B - Recommended',
  }, {
    value: 0,
    color: '#ff8d00de',
    legendLabel: 'C - Ok',
    tooltip: 'C - Ok',
  }, {
    value: 0,
    color: '#e0403d',
    legendLabel: 'D - Not Recommended',
    tooltip: 'D - Not Recommended',
  }, {
    value: 0,
    color: '#737373',
    legendLabel: 'No Data',
    tooltip: 'No Data',
  },
];

const QualityMap = (props: QualityMapProps) => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const bedroomsOptions = ["All", "One", "Two", "Three", "Four", "Five"];
  const scoreOptions = [
    {
      option: "By overall",
      text: "Weighted score by all score types"
    },
    {
      option: "By percentage increase",
      text: "Percentage increase predicted"
    },
    {
      option: "By precision",
      text: "How confident are we in the predictions"
    },
    {
      option: "By sales",
      text: "The amount of sales during the past year"
    }
  ]

  useEffect(() => {
    fetch(urlConstants.heatmapcordURL + "?year=" + props.year)
      .then((response) => response.json())
      .then((data) => {
        setNeighborhoods(data.data)
      });
  }, [props.year])



  const marks = [
    {
      value: 1,
      label: 'A',
    },
    {
      value: 2,
      label: 'B',
    },
    {
      value: 3,
      label: 'C',
    },
    {
      value: 4,
      label: 'D',
    }
  ];

  const getScore = (n: Neighborhood) => {
    if (props.scoreType == "By overall") {
      switch (props.bedrooms) {
        case "All": return n.GENERAL_SCORE;
        case "One": return n.ONEBR_GENERAL_SCORE;
        case "Two": return n.TWOBR_GENERAL_SCORE;
        case "Three": return n.THREEBR_GENERAL_SCORE;
        case "Four": return n.FOURBR_GENERAL_SCORE;
        case "Five": return n.FIVEBR_GENERAL_SCORE;
      }
    }
    else if (props.scoreType == "By percentage increase")
      switch (props.bedrooms) {
        case "All": return n.PRECENTAGE_SCORE;
        case "One": return n.ONEBR_PRECENTAGE_SCORE;
        case "Two": return n.TWOBR_PRECENTAGE_SCORE;
        case "Three": return n.THREEBR_PRECENTAGE_SCORE;
        case "Four": return n.FOURBR_PRECENTAGE_SCORE;
        case "Five": return n.FIVEBR_PRECENTAGE_SCORE;
      }
    else if (props.scoreType == "By precision")
      switch (props.bedrooms) {
        case "All": return n.PERCISION_SCORE;
        case "One": return n.ONEBR_PERCISION_SCORE;
        case "Two": return n.TWOBR_PERCISION_SCORE;
        case "Three": return n.THREEBR_PERCISION_SCORE;
        case "Four": return n.FOURBR_PERCISION_SCORE;
        case "Five": return n.FIVEBR_PERCISION_SCORE;
      }
    else if (props.scoreType == "By sales")
      switch (props.bedrooms) {
        case "All": return n.TREND_SCORE;
        case "One": return n.ONEBR_TREND_SCORE;
        case "Two": return n.TWOBR_TREND_SCORE;
        case "Three": return n.THREEBR_TREND_SCORE;
        case "Four": return n.FOURBR_TREND_SCORE;
        case "Five": return n.FIVEBR_TREND_SCORE;
      }
    else return "0";
  }

  function numToLetter(value: number, index:number) : string {
    switch (value) {
      case 1: return 'A';
      case 2: return 'B';
      case 3: return 'C';
      case 4: return 'D';
    }
    return "-";

  }
  return (

    <Grid container style={{ flex: 1, padding: 5, overflow: 'hidden', overflowY: "scroll"}}>

      <Grid item xs={12} sm={4} style={{ padding: 10 }} >
        <Typography variant="h3" noWrap>
          HeatMap Prediction
          </Typography>
          <br/>
        <div>
        <br/>
          <Typography className={classes.title} variant="h6" noWrap>
            Bus
          </Typography>
          <Slider
            min={1}
            max={4}
            className={classes.slider}
            defaultValue={1}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={(_, newValue) => {
              // props.setYear(newValue)
            }}
          />
          <Typography className={classes.title} variant="h6" noWrap>
            Beach
          </Typography>
          <Slider
            min={1}
            max={4}
            className={classes.slider}
            defaultValue={1}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={(_, newValue) => {
              // props.setYear(newValue)
            }}
          />
          <Typography className={classes.title} variant="h6" noWrap>
            Highway
          </Typography>
          <Slider
            min={1}
            max={4}
            className={classes.slider}
            defaultValue={1}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={(_, newValue) => {
              // props.setYear(newValue)
            }}
          />
          <Typography className={classes.title} variant="h6" noWrap>
            School
          </Typography>
          <Slider
            min={1}
            max={4}
            className={classes.slider}
            defaultValue={1}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={(_, newValue) => {
              // props.setYear(newValue)
            }}
          />
          <Typography className={classes.title} variant="h6" noWrap>
            Train
          </Typography>
          <Slider
            min={1}
            max={4}
            className={classes.slider}
            defaultValue={1}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={(_, newValue) => {
              props.setYear(newValue)
            }}
          />
        </div>

        <Typography className={classes.title} variant="h6" noWrap>
          Bedrooms
          </Typography>
        <div className={classes.search}>
          <ButtonGroup size="small" aria-label="small outlined button group">
            {bedroomsOptions.map(option => (
              <Button key={option} className={option === props.bedrooms ? classes.active : ''} onClick={() => props.setBedrooms(option)}>{option}</Button>
            ))}
          </ButtonGroup>
        </div>
        <Typography className={classes.title} variant="h6" noWrap >
          Legend
          </Typography>
        <div><ColorBar data={colorBarData} /></div>


      </Grid>




      <Grid item xs={12} sm={8}>

        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCULl-nlhWneAnyEm5MJ3SrxaYkp535r7Q' }}
          defaultCenter={props.defaultCenter}
          defaultZoom={props.defaultZoom}
        >
          {neighborhoods.map((n: any) => {
            const score = getScore(n);
            return (<MapSpot
              lat={n.LAT}
              key={n.NEIGHBORHOOD_ID}
              lng={n.LONG}
              onClick={() => console.log('navigate to: ', n)}
              text={n.NEIGHBORHOOD}
              group={score}
              radius={100}
              neighborhood={n}
              bedrooms={props.bedrooms}
              scoreType={props.scoreType}
            />)
          })}
        </GoogleMapReact>

      </Grid>
      {/* <SearchBtn onClick={() => setOpen(true)} />
      <SearchModal open={open} setOpen={setOpen} /> */}
    </Grid>
  );
}


QualityMap.defaultProps = {
  defaultCenter: {
    lat: 32.0879267,
    lng: 34.8322654
  },
  defaultZoom: 14
};

export default QualityMap;