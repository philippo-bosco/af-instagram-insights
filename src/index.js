import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//import customs
import initFacebookSDK from "./components/initFacebookSDK";
import App from "./App";
import "./styles/index.css";

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
