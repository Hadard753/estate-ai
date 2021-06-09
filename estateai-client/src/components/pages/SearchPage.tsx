import React, { useState } from 'react';
import ColorBar from 'react-color-bar';

import {
    Button, ButtonGroup, CircularProgress, Grid, makeStyles, TextField, Typography
} from '@material-ui/core';

import { urlConstants } from '../../api_urls';
import Distances from '../Distances/Distances';
import Prediction from '../Distances/Prediction';
import AutoComplete from '../Map/Autocomplete';
import Map from '../Map/Map';
import { colorBarData } from '../Map/SimpleMap';

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
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    leftPane: {
        padding: '12px'
    }
}));

const SearchPage = () => {
    const [results, setResults] = useState({ distances: null, prediction: null, pointer: (null as any), improvements: null });
    const [search, setSearch] = useState({ lat: 0, lng: 0, rooms: 'All', size: '', floor: '', totalFloor: ''});
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const bedroomsOptions = ["All", "One", "Two", "Three", "Four", "Five"];

    const searchColorBarData = [
        {
          value: 0,
          color: '#4fa34c',
          legendLabel: 'A - Best',
          tooltip: 'A - Best',
        }, {
          value: 0,
          color: '#ffec00',
          legendLabel: 'B - Good',
          tooltip: 'B - Good',
        }, {
          value: 0,
          color: '#ff8d00de',
          legendLabel: 'C - Ok',
          tooltip: 'C - Ok',
        }, {
          value: 0,
          color: '#e0403d',
          legendLabel: 'D - Bad',
          tooltip: 'D - Bad',
        }, {
          value: 0,
          color: '#737373',
          legendLabel: 'No Data',
          tooltip: 'No Data',
        },
      ];

      const roomsTextToNumber = (text) => {
        switch(text){
            case "All": return '';
            case "One": return 1;
            case "Two": return 2;
            case "Three": return 3;
            case "Four": return 4;
            case "Five": return 5;
            default: return '';
        }
    }

    const handleSearch = () => {
        setLoading(true);
        const { lat, lng, rooms } = search;
        fetch(urlConstants.assetPredictionURL + `?lat=${lat}&long=${lng}`)
            .then((response) => response.json())
            .then((predictions) => {
                fetch(urlConstants.distancesURL + `?LATITUDE=${lat}&LONGITUDE=${lng}`)
                .then((response) => response.json())
                .then((distances) => {
                    const {bus, beach, train, highway, school} = distances.data;
                    fetch(urlConstants.improvementsURL + `?LATITUDE=${lat}&LONGITUDE=${lng}&rooms=${roomsTextToNumber(rooms)}&score=${predictions.data['PRECENTAGE_SCORE']}&busCurScore=${distances.data.bus}&highwayCurScore=${highway}&beachCurScore=${beach}&schoolCurScore=${school}&trainCurScore=${train}`)
                    .then((response) => response.json())
                    .then((improvements) => {
                        setResults({ distances: distances.data, prediction: predictions.data, pointer: {lat, lng}, improvements: improvements.data });
                        setLoading(false);
                    });
                });
            });
    }

    return (
        <div style={{ flex: 1 }}>
            <Grid container spacing={3}>
                <Grid item lg={4} md={3}>
                    <Typography variant="h3" noWrap className={classes.leftPane}>
                        Search
                    </Typography>
                    <br />
                    <Typography variant="h6" className={classes.leftPane}>
                        Here you can can insert your asset details and get a good understanding of what you are getting! what score we give your asset, how life is going to be there and etc
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <AutoComplete handleCoordinates={(coordinates) => setSearch({ ...search, ...coordinates })}/>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    Bedrooms
                                </Typography>
                                <ButtonGroup size="small" aria-label="small outlined button group">
                                    {bedroomsOptions.map(option => (
                                        <Button key={option} className={option === search.rooms ? classes.active : ''} onClick={() => setSearch({...search, rooms: option})}>{option}</Button>
                                    ))}
                                </ButtonGroup>
                        <Button disabled={ loading || !search.lat } onClick={handleSearch} variant="contained" style={{ backgroundColor: 'green' }}>Search</Button>
                    </form>
                    <div  className={classes.leftPane}>
                    <Typography className={classes.title} variant="h6" noWrap >
                    Legend
                    </Typography>
                    <div><ColorBar data={searchColorBarData} /></div>
                    </div>
                </Grid>
                <Grid item container spacing={2} lg={8} md={9}>
                    {loading ?  <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            ><CircularProgress style={{ width: '120px', height: '120px' }}/></Grid> : <React.Fragment>
                    <Grid item xs={3}>
                        {results.distances === null ? null : <Distances improvements={results.improvements || {}} data={results.distances || {}} />}
                    </Grid>
                    <Grid item container xs={9}>
                        <Grid item xs={12}>
                            {results.prediction === null ? null :
                            <Prediction data={results.prediction || {}} />}
                           {
                                results.pointer !== null &&
                                <Map
                                    pointer={results.pointer}
                                />
                            }
                        </Grid>
                    </Grid>
                        </React.Fragment>}
                </Grid>
            </Grid>
        </div>
    )
};


export default SearchPage