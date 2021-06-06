import React from "react";
import ReactDOM from "react-dom";
import { IndexPage } from "./components/pages/index";
import { Router } from "@reach/router"


ReactDOM.render(
  <Router>
    <IndexPage path="/"/>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA