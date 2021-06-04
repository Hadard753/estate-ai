import React, { useState } from 'react';

// import Autocomplete from 'react-google-autocomplete';
import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';

import { urlConstants } from '../../api_urls';
import Distances from '../Distances/Distances';
import ParlorForm from '../Map/Autocomplete';

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
            width: '33ch',
        },
    },
    leftPane: {
        padding: '12px'
    }
}));


const SearchPage = () => {
    const [results, setResults] = useState({ distances: null, prediction: ""});
    const [search, setSearch] = useState({ address: '', rooms: '', size: '', floor: '', totalFloor: ''});

    const classes = useStyles();

    const handleSearch = () => {
        // TODO: convert search.address to lat an lon
        const lat ="32.0763272";
        const lon ="34.7704299";
        fetch(urlConstants.distancesURL + `?LATITUDE=${lat}&LONGITUDE=${lon}`)
        .then((response) => response.json())
        .then((data) => {
            setResults({ ...results, distances: data.data })
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
                    <ParlorForm />
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField value={search.address} onChange={(e) => setSearch({...search, address: e.target.value})} style={{width: '68ch'}} id="address-input" label="Address" variant="outlined" />
                        <TextField value={search.rooms} onChange={(e) => setSearch({...search, rooms: e.target.value})} type="number" InputProps={{ inputProps: { min: 1, max: 10 } }} id="rooms-input" label="#Room" variant="outlined" />
                        <TextField value={search.size} onChange={(e) => setSearch({...search, size: e.target.value})} type="number" InputProps={{ inputProps: { min: 0, max: 4000 } }} id="size-input" label="Size" variant="outlined" />
                        <TextField value={search.floor} onChange={(e) => setSearch({...search, floor: e.target.value})} type="number" InputProps={{ inputProps: { min: -5, max: 100 } }} id="floor-input" label="Floor" variant="outlined" />
                        <TextField value={search.totalFloor} onChange={(e) => setSearch({...search, totalFloor: e.target.value})} type="number" InputProps={{ inputProps: { min: -5, max: 100 } }} id="num-floor-input" label="Out of Floor" variant="outlined" />
                        <Button style={{width: '68ch'}} onClick={handleSearch} variant="contained" color="primary">Search</Button>
                    </form>
                </Grid>
                <Grid item xs={8}>
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
            </Grid>
        </div>
    )
};


export default SearchPage