/**
 * TODO today
 * - routing del login -> account page dopo LOGIN
 * - passare accessToken da LoginFacebook a AccountPage ed eseguire le query necessarie
 * - display nome e cognome e immagine profilo AccountPage
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

/**
 * ACCOUNTPAGE {structure}:
 * |
 * |-> NAVBAR (ROUTE):
 *      |-> profile
 *      |-> insights
 */
