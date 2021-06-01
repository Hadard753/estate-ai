import React from 'react';

import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
// import TextField from '@material-ui/core/Field';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    dialog: {
        '& > .MuiDialog-paperWidthSm': {
            maxWidth: '430px'
        }
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function SearchModal({ open, setOpen }: any) {
    const classes = useStyles();

    return (
        <Dialog className={classes.dialog} onClose={() => setOpen(false)} aria-labelledby="search-dialog" open={open}>
            <DialogTitle id="search-dialog-title">Insert your asset details</DialogTitle>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField style={{width: '52ch'}} id="address-input" label="Address" variant="outlined" />
                <TextField type="number" InputProps={{ inputProps: { min: 1, max: 10 } }} id="rooms-input" label="#Room" variant="outlined" />
                <TextField type="number" InputProps={{ inputProps: { min: 0, max: 4000 } }} id="size-input" label="Size" variant="outlined" />
                <TextField type="number" InputProps={{ inputProps: { min: -5, max: 100 } }} id="floor-input" label="Floor" variant="outlined" />
                <TextField type="number" InputProps={{ inputProps: { min: -5, max: 100 } }} id="num-floor-input" label="Out of Floor" variant="outlined" />
                <Button onClick={() => setOpen(false)}>Close</Button>
                <Button>Search</Button>
            </form>
        </Dialog>
    );
}
