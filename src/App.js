/**
 * TODO today
 * - routing di
 */

import "./App.css";
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import LoginFacebook from "./components/LoginFacebook";

function App() {
  return (
    <Routes>
      {/* semplice dichiarazione path x Component */}
      <Route path="/" element={<LoginFacebook />} />{" "}
    </Routes>
  );
}

export default App;
