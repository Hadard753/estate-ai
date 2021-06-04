import React, { useState } from 'react';

import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';

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
    const [results, setResults] = useState(null);

    const classes = useStyles();
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
                        <TextField style={{width: '68ch'}} id="address-input" label="Address" variant="outlined" />
                        <TextField type="number" InputProps={{ inputProps: { min: 1, max: 10 } }} id="rooms-input" label="#Room" variant="outlined" />
                        <TextField type="number" InputProps={{ inputProps: { min: 0, max: 4000 } }} id="size-input" label="Size" variant="outlined" />
                        <TextField type="number" InputProps={{ inputProps: { min: -5, max: 100 } }} id="floor-input" label="Floor" variant="outlined" />
                        <TextField type="number" InputProps={{ inputProps: { min: -5, max: 100 } }} id="num-floor-input" label="Out of Floor" variant="outlined" />
                        <Button style={{width: '68ch'}} variant="contained" color="primary">Search</Button>
                    </form>
                </Grid>
                <Grid item xs={8}>
                    {results == null ?
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Typography variant="h2" align="center">Use the search button to see the resutls</Typography>
                        </Grid>
                        :
                        "results exists"}
                </Grid>
            </Grid>
        </div>
    )
};


export default SearchPage