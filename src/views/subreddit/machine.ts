import { Machine, EventObject, assign, DoneInvokeEvent } from 'xstate';
import { Subreddit } from './subreddit';

export enum SubredditEventType {
  Request = 'Request',
  Success = 'Success',
  Error = 'Error'
}

export interface SubredditEventObject extends EventObject {
  type: SubredditEventType,
  name?: string;
  subreddit?: Subreddit;
}

export type SubredditEvent = SubredditEventObject & Partial<DoneInvokeEvent<Subreddit>>;

export enum SubredditStateType {
  Ready = 'Ready',
  Loading = 'Loading',
  Done = 'Done'
}

interface SubredditContext {
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
    initial: SubredditStateType.Ready,
    context: {},
    states: {
      [SubredditStateType.Ready]: {
        on: {
          [SubredditEventType.Request]: SubredditStateType.Loading
        }
      },
      [SubredditStateType.Loading]: {
        invoke: {
          src: (context: SubredditContext, event: SubredditEvent) => 
            fetch(`https://api.reddit.com/r/${event.name}/about`)
              .then((res) => res.json()),
          onDone: {
            target: SubredditStateType.Done,
            actions: ['setSubreddit']
          }
        }
      },
      [SubredditStateType.Done]: {}
    },
  },
  {
    actions: {
      setSubreddit: assign<SubredditContext, SubredditEvent>({
        subreddit: (context, event) => event.data
      })
    }
  },
);
