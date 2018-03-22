// @flow
import { stringify } from "qs";

const OAUTH_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAACzlzQAAAAAAMmIkv8URBEHzbRW7QFU%2FZS6%2FjWA%3D80D4ES5j9RnrBgRDz98WVKQeJwvXfCXGMC6NE9S88JpK8Xgu97";
const API_ROOT = "/twitter/1.1/search/tweets.json";

const createHeaders = () =>
  new Headers({
    Authorization: `Bearer ${OAUTH_TOKEN}`,
    "Content-Type": "application/json"
  });

export default (q: string): Promise<Object> =>
  fetch(`${API_ROOT}?${stringify({ q })}`, {
    headers: createHeaders(),
    credentials: "include"
  }).then(r => r.json());
