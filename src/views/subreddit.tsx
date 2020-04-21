import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface SubredditViewProps {
  subreddit?: string;
}

export default (props: RouteComponentProps<SubredditViewProps>) => (
  <h1>/r/{props.match.params.subreddit}</h1>
)