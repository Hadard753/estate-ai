
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import ColorBar from 'react-color-bar';

import { Button, ButtonGroup, Grid, Tooltip, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { fade, makeStyles } from '@material-ui/core/styles';

import { urlConstants } from '../../api_urls';
import { Neighborhood } from '../../models/neighborhood';
import MapSpot from './MapSpot';

interface SimpleMapProps {
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

const SimpleMap = (props: SimpleMapProps) => {
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
      value: 2006,
      label: '06',
    },
    {
      value: 2007,
      label: '07',
    },
    {
      value: 2008,
      label: '08',
    },
    {
      value: 2009,
      label: '09',
    },
    {
      value: 2010,
      label: '10',
    },
    {
      value: 2011,
      label: '11',
    },
    {
      value: 2012,
      label: '12',
    },
    {
      value: 2013,
      label: '13',
    },
    {
      value: 2014,
      label: '14',
    },
    {
      value: 2015,
      label: '15',
    },
    {
      value: 2016,
      label: '16',
    },
    {
      value: 2017,
      label: '17',
    },
    {
      value: 2018,
      label: '18',
    },
    {
      value: 2019,
      label: '19',
    },
    {
      value: 2020,
      label: '20',
    },
    {
      value: 2021,
      label: '21',
    },
    {
      value: 2022,
      label: '22',
    },
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
  return (

    <Grid container style={{ flex: 1, padding: 5, overflow: 'hidden' }}>

      <Grid item xs={12} sm={4} style={{ padding: 10 }} >
        <Typography variant="h3" noWrap>
          HeatMap Prediction
          </Typography>
          <br/>
        <Typography variant="h6">
          Using Machine Learning algorithms, Estate-AI is able to predict for you the scores for the different neighberhoods in TLV  <br/>   <br/>
          Please select the Score System, Number of bedrooms and investigate the Tel Aviv map.
          </Typography>
        <div>
        <br/>
          <Typography className={classes.title} variant="h6" noWrap>
            Select Year
          </Typography>
          <Slider
            min={2006}
            max={2022}
            className={classes.slider}
            defaultValue={props.year}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={(_, newValue) => {
              props.setYear(newValue)
            }}
          />
        </div>
        <Typography className={classes.title} variant="h6" noWrap>
          Score System
          </Typography>
        <div className={classes.search}>
          <ButtonGroup size="small" aria-label="small outlined button group">
            {scoreOptions.map(option => (
              <Tooltip title={<h3>{option.text}</h3>}>
                <Button key={option.option} className={option.option === props.scoreType ? classes.active : ''} onClick={() => props.setScoreType(option.option)}>{option.option}</Button>
              </Tooltip>

            ))}
          </ButtonGroup>
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


SimpleMap.defaultProps = {
  defaultCenter: {
    lat: 32.0879267,
    lng: 34.8322654
  },
  defaultZoom: 14
};

export default SimpleMap;