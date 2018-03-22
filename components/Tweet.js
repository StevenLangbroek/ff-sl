// @flow

import React from "react";

type Tweet = {
  text: string
};

type Props = {
  tweet: Tweet
};

function Tweet(props: Props): React$Element<"li"> {
  return <li>{props.tweet.text}</li>;
}

export default Tweet;
