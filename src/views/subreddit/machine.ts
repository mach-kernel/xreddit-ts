import { Machine, assign } from 'xstate';
import { Subreddit } from './subreddit';
import { SubredditEvent, SubredditEventType } from './events';

export enum SubredditStateType {
  Waiting = 'Waiting',
  Loading = 'Loading',
  Done = 'Done',
}

export interface SubredditContext {
  subreddit?: Subreddit;
}

interface SubredditState {
  states: {
    [key in SubredditStateType]: {};
  };
}

export default Machine<SubredditContext, SubredditState, SubredditEvent>(
  {
    id: 'subreddit',
    initial: SubredditStateType.Waiting,
    context: {},
    states: {
      [SubredditStateType.Waiting]: {
        on: {
          [SubredditEventType.Request]: SubredditStateType.Loading,
        }
      },
      [SubredditStateType.Loading]: {
        invoke: {
          src: (context: SubredditContext, event: SubredditEvent) => 
            fetch(`https://api.reddit.com/r/${event.name}/about`)
              .then((res) => res.json()),
          onDone: {
            target: SubredditStateType.Done,
            actions: ['setSubreddit'],
          },
          onError: {
            target: SubredditStateType.Done,
            actions: ['setError'],
          }
        }
      },
      [SubredditStateType.Done]: {},
    },
  },
  {
    actions: {
      setSubreddit: assign<SubredditContext, SubredditEvent>({
        subreddit: (_, event) => event.data
      })
    }
  },
);
