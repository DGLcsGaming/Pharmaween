import React from "react";
import ReactDOM from "react-dom";
import "./css/bootstrap.min.css";
import "./css/spur.min.css";
import "./css/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

window.addEventListener("load", function() {
  const preloader = document.querySelector("#preloader");
  preloader.classList.add("preload-finish");
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
