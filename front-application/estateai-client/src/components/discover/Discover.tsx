import React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, TextField, MenuItem, FormControlLabel, Checkbox, Button, Icon } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      backgroundImage: 'url("https://images.adsttc.com/media/images/5be9/fd5c/08a5/e5a5/8c00/008f/slideshow/CARLES_FAUS_ARQUITECTURA_-_CARMEN_HOUSE_(2).jpg?1542061390")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      flexGrow: 1,
    },
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(4),
      marginLeft: 250,
    }
  }),
);
export default function Discover() {
  function navigate(to: string) {
    history.push(to);
  }
  let history = useHistory();

  const classes = useStyles();
  const [Bedrooms, setBedRooms] = React.useState('');
  const [Bathrooms, setBathRooms] = React.useState('');
  const [state, setState] = React.useState({
    checkedB: false,
    checkedC: false,

  });

  const handleChange = (changeTo: string, event: React.ChangeEvent<{ value: unknown }>) => {
    if (changeTo === 'bedRoom')
      setBedRooms(event.target.value as string);
    if (changeTo === 'bathRoom')
      setBathRooms(event.target.value as string);
  }
  const checkboxToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <>
      <Grid className={classes.root} container alignContent='center' alignItems='center' direction='column' spacing={2} justify='center'>
        <Typography variant="h2" gutterBottom align='center'>
          Discover your desired asset's potential
        </Typography>

        <Typography variant="h6" gutterBottom align='center' color='primary'>
          Please fill-out the form, all fields are optional. The more options you enter the more accurate your potential profit is
        </Typography>

        <form className={classes.form} noValidate autoComplete="off">
          <Grid container alignContent='center' direction='row' sm={9} justify='center' >
            <Grid item sm={2} ></Grid>
            <Grid item sm={5} >
              <TextField label="Enter the city" variant="filled" />
              <TextField label="Enter Street name" variant="filled" />
              <TextField label="Asking price" variant="filled" />
            </Grid>
            <Grid item sm={5} >
              <TextField select label="bedrooms" value={Bedrooms} onChange={(e) => handleChange('bedRoom', e)} variant="filled"  >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5+</MenuItem>
              </TextField>
              <TextField select label="bathrooms" value={Bathrooms} onChange={(e) => handleChange('bathRoom', e)} variant="filled"  >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5+</MenuItem>
              </TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={checkboxToggle}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Asset has parking"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedC}
                    onChange={checkboxToggle}
                    name="checkedC"
                    color="primary"
                  />
                }
                label="Asset has a balcony"
              />
            </Grid>
            <Button variant="contained" color="primary" className={classes.button} onClick={()=> navigate('/Calculated')} > Calculate the asset's potential </Button>
          </Grid>

        </form>

      </Grid>


    </>
  );
}
