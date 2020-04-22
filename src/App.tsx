import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Index from './views/index';
import Subreddit from './views/subreddit';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

export default () => (
  <Container>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          xreddit
        </Typography>
      </Toolbar>
    </AppBar>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Index} />
        <Route path='/r/:subreddit' component={Subreddit} />
      </Switch>
    </BrowserRouter>
  </Container>
);