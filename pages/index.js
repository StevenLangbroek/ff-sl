// @flow

import React from "react";
import map from "lodash/fp/map";
import searchTweets from "../api/searchTweets";
import Tweet from "../components/Tweet";

type Status = "idle" | "searching" | "failed";

type State = {
  status: Status,
  searchText: string,
  results?: mixed[]
};

class IndexPage extends React.Component<*, *> {
  state = {
    status: "idle",
    searchText: "",
    status: "idle"
  };

  onInputChange = (event: Event) => {
    // $FlowFixMe
    event.persist();

    const q = event.target.value;

    this.setState(currentState => ({
      ...currentState,
      status: "searching",
      searchText: event.target.value
    }));

    searchTweets(q).then(
      results => {
        this.setState(currentState => ({
          ...currentState,
          status: "idle",
          results
        }));
      },
      error => {
        this.setState(currentState => ({
          status: "failed",
          error
        }));
      }
    );
  };

  render() {
    const { results } = this.state;
    return (
      <div>
        <h1>Twitter API Search</h1>
        <input
          type="text"
          name="searchText"
          value={this.state.searchText}
          onChange={this.onInputChange}
        />
        <ul>
          {!!results
            ? map(tweet => <Tweet key={tweet.id} tweet={tweet} />)(
                results.statuses
              )
            : null}
        </ul>
      </div>
    );
  }
}

export default IndexPage;
