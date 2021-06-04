import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';


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
    }
}));


const SearchPage = () => {
    const [results, setResults] = useState(null);

    const classes = useStyles();
    return (
        <div style={{ flex: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography variant="h3" noWrap>
                        Search Page
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        Here you can can insert your asset details and get a good understanding of what you are getting! what score we give your asset, how life is going to be there and etc
                    </Typography>
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