import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import initFacebookSDK from "./components/initFacebookSDK";

const root = ReactDOM.createRoot(document.getElementById("root"));

initFacebookSDK().then(() => {
  root.render(<App />);
});
