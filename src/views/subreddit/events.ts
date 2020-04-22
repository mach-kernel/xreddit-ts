import { EventObject, DoneInvokeEvent } from "xstate";
import { Subreddit } from "./subreddit";

export enum SubredditEventType {
  Request = 'Request',
}

interface BaseSubredditEvent extends EventObject {
  type: SubredditEventType;
}

export interface SubredditRequestEvent extends BaseSubredditEvent {
  type: SubredditEventType.Request;
  name?: string;
}

export type SubredditEvent = 
  SubredditRequestEvent & 
  Partial<DoneInvokeEvent<Subreddit>>
;