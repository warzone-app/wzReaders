import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/indexStore";
import history from "./history";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router history={history}>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
