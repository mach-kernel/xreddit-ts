import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useMachine } from '@xstate/react';

import machine, { SubredditStateType, SubredditContext} from './machine';
import { SubredditEventType, SubredditEvent } from './events';

import { CircularProgress } from '@material-ui/core';

interface SubredditRouteProps {
  subreddit?: string;
}

export default (props: RouteComponentProps<SubredditRouteProps>) => {
  const [state, send] = useMachine<SubredditContext, SubredditEvent>(machine);

  if (state?.matches(SubredditStateType.Waiting)) {
    send({ 
      type: SubredditEventType.Request, 
      name: props.match.params.subreddit!
    });
  } else if (state?.matches(SubredditStateType.Loading)) {
    return (<CircularProgress />);
  } else if (state?.matches(SubredditStateType.Done)) {
    return (
      <>
        <h1>{state.context.subreddit?.data.url}</h1>
        <h4>{state.context.subreddit?.data.public_description}</h4>
      </>
    )
  }

  return null;
}