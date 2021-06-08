
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
  const [neighborhoods, setNeighborhoods] = useState({});
  const [userRequests, setUserRequests] = useState({
    bus: 'D',
    beach: 'D',
    highway: 'D',
    school: 'D',
    train: 'D',
  });
  const [bedrooms, setBedrooms] = useState("All");
  const classes = useStyles();
  const bedroomsOptions = ["All", "One", "Two", "Three", "Four", "Five"];

  useEffect(() => {
    Promise.all([
      fetch(urlConstants.heatmapcordURL + "?year=2022"),
      fetch(urlConstants.neighborhoodsDistances)
    ])
      .then((responses) => Promise.all(responses.map(r => r.json())))
      .then((data) => {
        const neighborhoodDic = {};
        data[0].data.forEach((n: Neighborhood) => {
          neighborhoodDic[n.NEIGHBORHOOD] = n
        });
        data[1].data.forEach((n) => {
          if(neighborhoodDic[n.name]) {
            neighborhoodDic[n.name] = {
              ...neighborhoodDic[n.name],
              distances: n.scores
            }
          }
        })
        setNeighborhoods(neighborhoodDic);
      });
  }, [])

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    }
  ];

  const getScore = (n: Neighborhood) => {
    switch (bedrooms) {
      case "All": return n.PRECENTAGE_SCORE;
      case "One": return n.ONEBR_PRECENTAGE_SCORE;
      case "Two": return n.TWOBR_PRECENTAGE_SCORE;
      case "Three": return n.THREEBR_PRECENTAGE_SCORE;
      case "Four": return n.FOURBR_PRECENTAGE_SCORE;
      case "Five": return n.FIVEBR_PRECENTAGE_SCORE;
      default: return "0";
    }
  }

  const numToScore = (num) => {
    switch(num) {
      case 1: return 'A';
      case 2: return 'B';
      case 3: return 'C';
      case 4: return 'D';
      default: return '0';
    }
  }

  return (
    <Grid container style={{ flex: 1, padding: 5, overflow: 'hidden', overflowY: "scroll"}}>
      <Grid item xs={12} sm={4} style={{ padding: 10 }} >
        <Typography variant="h4" noWrap>
          Rate how important
          <br/>
         each feature for you from 1-4
          </Typography>
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
            onChangeCommitted={(_, newValue: any) => {
              setUserRequests({ ...userRequests, bus: numToScore(newValue) });
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
            onChangeCommitted={(_, newValue: any) => {
              setUserRequests({ ...userRequests, beach: numToScore(newValue) });
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
            onChangeCommitted={(_, newValue: any) => {
              setUserRequests({ ...userRequests, highway: numToScore(newValue) });
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
            onChangeCommitted={(_, newValue: any) => {
              setUserRequests({ ...userRequests, school: numToScore(newValue) });
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
            onChangeCommitted={(_, newValue: any) => {
              setUserRequests({ ...userRequests, train: numToScore(newValue) });
            }}
          />
        </div>

        <Typography className={classes.title} variant="h6" noWrap>
          Bedrooms
          </Typography>
        <div className={classes.search}>
          <ButtonGroup size="small" aria-label="small outlined button group">
            {bedroomsOptions.map(option => (
              <Button key={option} className={option === bedrooms ? classes.active : ''} onClick={() => setBedrooms(option)}>{option}</Button>
            ))}
          </ButtonGroup>
        </div>
        <Typography className={classes.title} variant="h6" noWrap >
          Legend -
        </Typography>
        <Typography className={classes.title} variant="h6" noWrap >
          The colors represents the annual revenue percentage
          <br/>
          While the transperancy represent the feature match
        </Typography>
        <div><ColorBar data={colorBarData} /></div>
      </Grid>
      <Grid item xs={12} sm={8}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCULl-nlhWneAnyEm5MJ3SrxaYkp535r7Q' }}
          defaultCenter={props.defaultCenter}
          defaultZoom={props.defaultZoom}
        >
          {Object.values(neighborhoods).map((n: any) => {
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
              bedrooms={bedrooms}
              scoreType={props.scoreType}
              userRequest={userRequests}
            />)
          })}
        </GoogleMapReact>
      </Grid>
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