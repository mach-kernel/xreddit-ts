import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useMachine } from '@xstate/react';

import machine, { SubredditEventType, SubredditStateType } from './machine';
import { CircularProgress } from '@material-ui/core';

interface SubredditViewProps {
  subreddit?: string;
}

export default (props: RouteComponentProps<SubredditViewProps>) => {
  const [state, send] = useMachine(machine);

  if (state?.matches(SubredditStateType.Ready)) {
    send({ type: SubredditEventType.Request, name: props.match.params.subreddit });
  } else if (state?.matches(SubredditStateType.Loading)) {
    return (<CircularProgress />);
  }

  return (
    <>
      <h1>{state.context.subreddit?.data.url}</h1>
      <h4>{state.context.subreddit?.data.public_description}</h4>
    </>
  )
}