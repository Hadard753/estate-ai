import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Toolbar,makeStyles, CssBaseline,Button,Box, Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) =>  ({
root : {
  minHeight: '100vh',
  backgroundImage: 'url("https://pix10.agoda.net/hotelImages/548/5482932/5482932_18081610470067487153.jpg?s=1024x768")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  flexGrow: 1,
},
card : {
  textAlign: 'center',
  backgroundColor: 'rgba(245, 245, 245, 0.6)',
  borderRadius: 16
},
btn : {
margin: 10
}
}));

export default function Home() {
  function navigate(to: string) {
    history.push(to);
  }
  let history = useHistory();
  const classes = useStyles();
  return (
    <>
<div className={classes.root}>   
  <CssBaseline />
    <Grid container alignContent='center' alignItems='center' direction='column' spacing={2} justify='center'>
       <Grid item xs={3}>     </Grid>

      <Grid item xs={6}>
        <Typography variant="h3" gutterBottom align='center'>
         Welcome to EstateAI
        </Typography>

        <Typography variant="h6" gutterBottom align='center'>  
            Here in EstateAI we help you to locate the the best investment opportunities in the Real Estate world.
            Our goal is to identify optimal assets for investment, that will guarantee you make the greatest profit.
            We offer two services
        </Typography>   

        <Grid container alignItems='stretch' direction='row' justify='center' >
          <Grid item sm={5} className={classes.card}>
            <Button variant="contained" color="primary" onClick={()=> navigate('/Discover')} className={classes.btn}>Discover potential</Button>
              <Typography variant="h6" gutterBottom >          
               Based on the the asset's properties,
               we will provide you with a score and information regarding the assets
               and maybe offer you a better qccuisition that matches the charecaristics of the properties
              </Typography>    
          </Grid>

          <Grid item xs={1}>     </Grid>

          <Grid item sm={5} className={classes.card}>
            <Button variant="contained" color="primary" onClick={()=> navigate('/RecommendedByProperty')} className={classes.btn}>Reccomendations</Button><br/>
            <Typography variant="h6" gutterBottom>   
              Based on the current market status and other factors we will provide you
              a recommendation for high potentials zones to make a purchase and reach high profit 
            </Typography>   
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>     </Grid>
    </Grid>
</div>
</>
  );
}
