import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import LinkdeinIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import React from 'react';

import SimpleMap from '../Map/SimpleMap';

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
        card: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
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
              image: "../../static/images/hadar.jfif",
              fb_link: "",
              linkd_link: ""
          },
          {
            name: "Doron Eli Rachman",
            title: "Senior Full Stack Developer",
            image: "doron.jfif",
            fb_link: "",
            linkd_link: ""
        },
        {
            name: "Gal Harris",
            title: "QA Automation Analysis Manager",
            image: "gal.jfif",
            fb_link: "",
            linkd_link: ""
        },
        {
            name: "Stav Bernaz",
            title: "DevOps Engineer",
            image: "stav.jfif",
            fb_link: "",
            linkd_link: ""
        }
      ];

      const classes = useStyles();
    return (

        <div>
            <Grid container style={{ flex: 1, padding: 5, overflow: 'hidden' }}>

                <Grid item xs={12} sm={4} >
                    <Typography variant="h4" >
                        Welcome to Estate-AI.
                    </Typography>
                    <Typography variant="h4" >
                        Find the best Real Estate investment for you.
                    </Typography>
                    <Typography variant="subtitle1" >
                        Here we can help you find the best investment that matches your needs.
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8}>
                    Some image here
                </Grid>
            </Grid>
            <Divider/>
            {/* ----------------------------- Start of About us -----------------------------*/}
            <Typography variant="h4" style={{padding: 5}}>
                    <Box textAlign="center">
                        About us
                    </Box>
            </Typography>
            <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" align='center'>
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.title}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <FacebookIcon></FacebookIcon>
                    <LinkdeinIcon></LinkdeinIcon>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </div>
    )
}