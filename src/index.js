//import libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";

//import customs
import "./index.css";
import App from "./App";
import initFacebookSDK from "./helpers/initFacebookSDK";
import { history } from "./helpers";

initFacebookSDK().then(startApp);
const root = ReactDOM.createRoot(document.getElementById("root"));
function startApp() {
  root.render(

    <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  );
}
