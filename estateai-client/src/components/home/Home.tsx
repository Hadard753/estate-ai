import React from 'react';

import { Typography } from '@material-ui/core';

export default function Home() {
  return (
      <>
        <Typography variant="h3" gutterBottom>
            Welcome to React starter template
        </Typography>
        <Typography variant="h6" gutterBottom>
            This template meant to get you up and running as fast as possible,
        </Typography>
        <Typography variant="h6" gutterBottom>
            allowing you and your team to focus on your business logic.
        </Typography>
        <Typography variant="h6" gutterBottom>
            Our stack: React, Redux, Material-ui, Node, Mongo, Dockers
        </Typography>
    </>
  );
}
