import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import initFacebookSDK from "./components/initFacebookSDK";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
initFacebookSDK().then(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});
