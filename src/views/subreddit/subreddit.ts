export interface Subreddit {
  kind: string;
  data: {
    id: string;
    url: string;
    display_name: string;
    title: string;
    public_description: string;

    // There's a lot in here
    [key: string]: any;
  }
}