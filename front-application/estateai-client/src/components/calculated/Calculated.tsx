import React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography,Button} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      backgroundImage: 'url("https://content.money.com/wp-content/uploads/2016/02/160218_ff_cashhouse.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      flexGrow: 1,
    },
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },
    typo: {
      margin: theme.spacing(4),
    },
    click: {
      margin: theme.spacing(4),
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    }
  }),
);
export default function Calculated() {
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
      <Grid className={classes.root} container justify='flex-start' alignContent='flex-start' alignItems='flex-start' direction='column' spacing={2}>
        <Typography className={classes.typo} variant="h2" gutterBottom >
          The potential profit of your asset
        </Typography>
        <Grid container direction='row' alignContent='space-between'>
          <Grid item sm={1}></Grid>
          <Grid item sm={3}>

            <Typography variant="h6" gutterBottom >
              <FiberManualRecordIcon style={{ fontSize: 15 }}></FiberManualRecordIcon>  The score of the asset is 8.2/10
        </Typography>

            <Typography variant="h6" gutterBottom >
              <FiberManualRecordIcon style={{ fontSize: 15 }}></FiberManualRecordIcon>  You are expected to earn 42,282₪ in the next five years by rent
        </Typography>

            <Typography variant="h6" gutterBottom >
              <FiberManualRecordIcon style={{ fontSize: 15 }}></FiberManualRecordIcon>   It is not reccomended to sell the house in the next five years because there is a major rise in that area due to two new neighberhoods being built
        </Typography>
        <img src={"https://awealthofcommonsense.com/wp-content/uploads/2019/03/Capture1-1.png"} width={500} height={300} />
          </Grid>

          <Grid item sm={5}></Grid>
          <Grid item sm={3}>
            <Typography variant="h6" gutterBottom >
              <FiberManualRecordIcon style={{ fontSize: 15 }}></FiberManualRecordIcon>  City plans:
        </Typography>

            <Typography variant="h6" gutterBottom >
              <FiberManualRecordIcon style={{ fontSize: 15 }}></FiberManualRecordIcon>  Tama plans:
        </Typography>

            <Typography variant="h6" gutterBottom >
              <FiberManualRecordIcon style={{ fontSize: 15 }}></FiberManualRecordIcon>  Profit made of similiar assets
        </Typography>
            <Typography variant="h6" gutterBottom >
              <FiberManualRecordIcon style={{ fontSize: 15 }}></FiberManualRecordIcon>  Profit made of nearby assets 
        </Typography>
 
        <Button variant="contained" color="primary" className={classes.click}> Click here to see similliar recommended assets </Button>

          </Grid>
        </Grid>
      </Grid>


    </>
  );
}
