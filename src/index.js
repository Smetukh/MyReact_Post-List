import React from "react";
import { render } from "react-dom";
import Router from "./scenes/router";
import { Provider } from "react-redux";
import store from "./store/createStore";

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
