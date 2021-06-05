import React, { useState } from 'react';
import { useEffect } from 'react';
import Geocode from 'react-geocode';

// import Autocomplete from 'react-google-autocomplete';
import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';

import { urlConstants } from '../../api_urls';
import Distances from '../Distances/Distances';
import Prediction from '../Distances/Prediction';
import Map from '../Map/Map';

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
    const [search, setSearch] = useState({ address: '', rooms: '', size: '', floor: '', totalFloor: ''});

    const classes = useStyles();

    useEffect(() => {
        // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey("AIzaSyDhaRgFmaOJiInS6XOCrqHapSisSC5BhtI");

        // set response language. Defaults to english.
        Geocode.setLanguage("en");
    } , [])

    const handleSearch = () => {
        // TODO: convert search.address to lat an lon
        Geocode.fromAddress(search.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                fetch(urlConstants.distancesURL + `?LATITUDE=${lat}&LONGITUDE=${lng}`)
                    .then((response) => response.json())
                    .then((distances) => {
                        fetch(urlConstants.assetPredictionURL + `?lat=${lat}&long=${lng}`)
                        .then((response) => response.json())
                        .then((predictions) => {
                            setResults({ distances: distances.data, prediction: predictions.data, pointer: {lat: parseFloat(lat), lng: parseFloat(lng)} })
                        });
                    });
            },
            (error) => {
               const lat ="32.0763272";
                const lng ="34.7704299";
                fetch(urlConstants.distancesURL + `?LATITUDE=${lat}&LONGITUDE=${lng}`)
                    .then((response) => response.json())
                    .then((distances) => {
                        fetch(urlConstants.assetPredictionURL + `?lat=${lat}&long=${lng}`)
                        .then((response) => response.json())
                        .then((predictions) => {
                            setResults({ distances: distances.data, prediction: predictions.data, pointer: {lat: parseFloat(lat), lng: parseFloat(lng)} })
                        });
                    });
            }
        )
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
                        <TextField value={search.address} onChange={(e) => setSearch({...search, address: e.target.value})} id="address-input" label="Address" variant="outlined" />
                        <TextField value={search.rooms} onChange={(e) => setSearch({...search, rooms: e.target.value})} type="number" InputProps={{ inputProps: { min: 1, max: 10 } }} id="rooms-input" label="#Room" variant="outlined" />
                        <Button onClick={handleSearch} variant="contained" color="primary">Search</Button>
                    </form>
                </Grid>
                <Grid item container spacing={2} xs={8}>
                    <Grid item xs={3}>
                        {results.distances === null ?
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Typography variant="h2" align="center">Use the search button to see the resutls</Typography>
                            </Grid>
                            : <Distances data={results.distances || {}} />}
                            </Grid>
                    <Grid item container xs={9}>
                        <Grid item xs={12}>
                            {results.prediction !== null &&
                            <Prediction data={results.prediction || {}} />}
                                                        {
                                results.pointer !== null &&
                                <Map
                                    pointer={results.pointer}
                                />
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};


export default SearchPage