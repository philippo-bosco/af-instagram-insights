//import libraries
import React from "react";
import { Router } from "react-router-dom";
import { render } from "react-dom";

//import customs
import "./index.css";
import App from "./App";
import initFacebookSDK from "./helpers/initFacebookSDK";
import { history } from "./helpers";

initFacebookSDK().then(startApp);

function startApp() {
  render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById("root")
  );
}
