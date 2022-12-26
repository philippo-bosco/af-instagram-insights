/**
 * TODO today
 * - routing del login -> account page dopo LOGIN
 * - display nome e cognome e immagine profilo AccountPage
 */

//import React libraries
import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

//import customs
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";

import Login from "pages/Login";
import { Home } from "./pages/HomeAccount";
import { Nav } from "./components/Nav";

function App() {
  const pathname = useLocation().pathname || "";
  return (
    <div>
      {/*<Nav />*/}
      <div className="container pt-4">
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
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
