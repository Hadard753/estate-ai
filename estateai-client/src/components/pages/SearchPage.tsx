import React, { useEffect, useRef, useState } from 'react';
import ColorBar from 'react-color-bar';
import Geocode from 'react-geocode';

// import Autocomplete from 'react-google-autocomplete';
import {
    Button, CircularProgress, Grid, makeStyles, TextField, Typography
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
            width: '68ch',
        },
    },
    leftPane: {
        padding: '12px'
    }
}));

const SearchPage = () => {
    const [results, setResults] = useState({ distances: null, prediction: null, pointer: (null as any) });
    const [search, setSearch] = useState({ lat: 0, lng: 0, rooms: '', size: '', floor: '', totalFloor: ''});
    const [loading, setLoading] = useState(false);
    const classes = useStyles();


    const handleSearch = () => {
        setLoading(true);
        const { lat, lng } = search;
        fetch(urlConstants.distancesURL + `?LATITUDE=${lat}&LONGITUDE=${lng}`)
            .then((response) => response.json())
            .then((distances) => {
                fetch(urlConstants.assetPredictionURL + `?lat=${lat}&long=${lng}`)
                .then((response) => response.json())
                .then((predictions) => {
                    setResults({ distances: distances.data, prediction: predictions.data, pointer: {lat, lng} });
                    setLoading(false);
                });
            });
    }

    return (
        <div style={{ flex: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography variant="h3" noWrap className={classes.leftPane}>
                        Search Page
                    </Typography>
                    <br />
                    <Typography variant="h6" className={classes.leftPane}>
                        Here you can can insert your asset details and get a good understanding of what you are getting! what score we give your asset, how life is going to be there and etc
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <AutoComplete handleCoordinates={(coordinates) => setSearch({ ...search, ...coordinates })}/>
                        {/* <TextField value={search.address} onChange={(e) => setSearch({...search, address: e.target.value})} id="address-input" label="Address" variant="outlined" /> */}
                        <TextField value={search.rooms} onChange={(e) => setSearch({...search, rooms: e.target.value})} type="number" InputProps={{ inputProps: { min: 1, max: 10 } }} id="rooms-input" label="#Room" variant="outlined" />
                        <Button disabled={ loading || !search.lat } onClick={handleSearch} variant="contained" style={{ backgroundColor: 'green' }}>Search</Button>
                    </form>
                    <div  className={classes.leftPane}>
                    <Typography className={classes.title} variant="h6" noWrap >
                    Legend
                    </Typography>
                    <div><ColorBar data={colorBarData} /></div>
                    </div>
                </Grid>
                <Grid item container spacing={2} xs={8}>
                    {loading ?  <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            ><CircularProgress style={{ width: '120px', height: '120px' }}/></Grid> : <React.Fragment>
                    <Grid item xs={3}>
                        {results.distances === null ? null : <Distances data={results.distances || {}} />}
                            </Grid>
                    <Grid item container xs={9}>
                        <Grid item xs={12}>
                            {results.prediction === null ?
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                {/* <Typography variant="h2" align="center">Use the search button to see the results</Typography> */}
                            </Grid>
                            :
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