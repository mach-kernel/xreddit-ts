import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Index from './views/index';
import Subreddit from './views/subreddit';

export default () => (
  <Container>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Index} />
        <Route path='/r/:subreddit' component={Subreddit} />
      </Switch>
    </BrowserRouter>
  </Container>
);