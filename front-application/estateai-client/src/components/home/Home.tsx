import React from 'react';

import { Typography } from '@material-ui/core';

export default function Home() {
  return (
      <>
        <Typography variant="h3" gutterBottom>
            Welcome to EstateAI
        </Typography>
        <Typography variant="h6" gutterBottom>
            Here in EstateAI we help you to locate the the best investment opportunities in the Real Estate world<br/>
            , our predictions and reccomendations are based on high end Artificial Intelligent tools.<br/>
            Our goal is to identify optimal assets for investment, that will guarantee you make the greatest profit.<br/>
            We offer two services<br/>
            1. Discover potential - based on the the asset's properties,<br/>
            we will provide you with a score and information regarding the assets<br/>
             and maybe offer you a better qccuisition that matches the charecaristics of the properties<br/>
             2. Reccomendations - Based on the current market status and other factors we will provide you<br/>
              a recommendation for high potentials zones to make a purchase and reach high profit  
        </Typography>      
    </>
  );
}
