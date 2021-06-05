import React from 'react';

import {
    Box, Card, CardActions, CardContent, CardMedia, Container, Divider, Grid, makeStyles, Typography
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkdeinIcon from '@material-ui/icons/LinkedIn';

export default function HomePage() {

  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    topCard: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: "600px"
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: "222px"
    },
    cardMedia: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      marginTop: '30'
    },
    cardContent: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

  const cards = [
    {
      name: "Hadar Dayan",
      title: "Senior Full Stack Developer",
      image: "hadar.jfif",
      fb_link: "https://www.facebook.com/hadar.dayan.31",
      linkd_link: "https://www.linkedin.com/in/hadar-dayan/"
    },
    {
      name: "Doron Eli Rachman",
      title: "Senior Full Stack Developer",
      image: "doron.jfif",
      fb_link: "https://www.facebook.com/doron050",
      linkd_link: "https://www.linkedin.com/in/doron-eli-rachman-218595b1/"
    },
    {
      name: "Gal Harris",
      title: "QA Automation Analysis Manager",
      image: "gal.jfif",
      fb_link: "https://www.facebook.com/gal.harris.5",
      linkd_link: "https://www.linkedin.com/in/gal-harris-4710a2133/"
    },
    {
      name: "Stav Bernaz",
      title: "DevOps Engineer",
      image: "stav.jfif",
      fb_link: "https://www.facebook.com/stav.bernaz",
      linkd_link: "https://www.linkedin.com/in/stav-bernaz-788141125/"
    },
    {
      name: "Almog Snir",
      title: "Solutions and Training Manager",
      image: "almog.jpg",
      fb_link: "https://www.facebook.com/almog.snir",
      linkd_link: "https://www.linkedin.com/in/almog-snir-788141125/"
    }
  ];

  const classes = useStyles();
  return (

    <div style={{ flex: 1, overflowY: "scroll" }}>
      <Grid container direction="row">
        <Grid sm={1} md={1} lg={1} xl={2}>
        </Grid>
        
        <Grid sm={10} md={10} lg={10} xl={8}>
          <Grid container style={{ flex: 1, padding: 5 }}>
            <Grid item sm={6}  >
              <br />
              <br />
              <br />
              <br />
              <br />
              <Typography variant="h3" >
                Welcome to Estate-AI
            </Typography>
              <Typography variant="h5" >
                Find the best Real Estate investment for you
            </Typography>
            <br />
            <Typography variant="subtitle1" >
              Finally, a reliable service that gives you the clarity to focus on how you can maximize your profit using Real Estate investments. Using sophisticated Artificial intelligent platforms, Estate-AI is able to help you gain insights & provide recommendations regarding Real Estate opportunities in Tel Aviv, Israel.
            </Typography>
              <br />
            
            </Grid>

            <Grid item sm={6}>
              <br />
              <br />
              <img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1024,h_759/https://www.ireal.ai/wp-content/uploads/2021/04/179-e2-1024x759.png" width="100%" height="90%" style={{padding:"20px"}}></img>
            </Grid>
          </Grid>
        {/* ----------------------------- Start of Our Services -----------------------------*/}
          <Typography variant="h4" align="center">
                Our Services
            </Typography>
            <br/>
            <br/>
              <Grid container direction="row" spacing={6} justify="center" style={{ textAlign: "center" }}>
                <Grid item>
                  <Card className={classes.topCard}>
                    <CardContent className={classes.cardContent}>
                      <img src="https://img.icons8.com/plasticine/2x/heat-map.png"></img>
                      <Typography gutterBottom variant="h5" component="h2" align='center'>
                        HeatMap Prediction
                    </Typography>
                      <Typography variant="body1">
                      You have decided you want to maximize your profit by investing in Real Estate, However, it's unclear where the correct location is in Tel Aviv to do so.<br/>
                      Using our “HeatMap Prediction” service you can easily understand which neighborhoods can yield you the maximum profit.
                    </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item>
                  <Card className={classes.topCard}>
                    <CardContent className={classes.cardContent}>
                      <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="https://cdn0.iconfinder.com/data/icons/real-estate-235/64/x-33-512.png" height="150" width="150"></img>
                      </div>
                      <Typography gutterBottom variant="h5" component="h2" align='center'>
                        Search by Property
                    </Typography>
                        <Typography variant="body1">
                        You already found a potential asset but you wish to gain further insights?<br/>
                        Using our “Search By Asset” service you can do so, maybe even find a better asset out there?
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid >
          <br />
          <br />
          <br />
          <br />
          {/* ----------------------------- Start of About us -----------------------------*/}
          <Typography variant="h4" style={{ padding: 5 }}>
            <Box textAlign="center">
              About us
            </Box>
          </Typography>
          <br/>
          <Grid container spacing={4} justify="center">
            {cards.map((card) => (
              <Grid item key={card.name}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                  <img src={card.image} height="200px" border-radius="50%"></img>
                    <Typography gutterBottom variant="h6" component="h2" align='center'>
                      {card.name}
                    </Typography>
                    <Typography align='center'>
                      {card.title}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <FacebookIcon onClick={() => window.open(card.fb_link)} />
                    <LinkdeinIcon onClick={() => window.open(card.linkd_link)} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid sm={1} md={1} lg={1} xl={2}>
        </Grid>
      </Grid>
    </div>
  )
}