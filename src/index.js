import React from "react";
import { render } from "react-dom";
import Router from "./scenes/router";

export class App extends React.Component {
  render() {
    return <Router />;
  }
}

render(<App />, document.getElementById("root"));
