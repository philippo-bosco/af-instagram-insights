/**
 * TODO
 * - sistemare privateRoute (non so come si fa a reindirizzare con i dati che ho)
 * - sistemare Login Page perchè annulla la form (probabile errore di routing)
 * - sistemare funzioni di cattura account Instagram in AccountService.js
 */

//import React libraries
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

//import customs
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import  Home  from "./pages/HomeAccount";
import  Navigation  from "./pages/Navbar";
import user from "./pages/user.jpg";
import Torta from "./pages/grafici";
import Barre from"./pages/Barre";
function App() {
  const pathname = useLocation().pathname || "";

  return (
    <>
    <div>
      <Navigation
        src={user}
        nome="Gesualdo"
        cognome="LoMonaco"
        follow="104"
        seguiti="208"
      />
      <div className="container pt-4">
        
        
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path="/stats" element={
                                        <>
                                        <Torta></Torta>
                                        <Barre></Barre>
                                        </>                                      
                                      
                                      } />
          <Route exact path="/home" element={<Home
                                              link="https://www.laleggepertutti.it/wp-content/uploads/2020/03/legge104.png"
                                              didascalia="complimenti hai vinto una 104">
                                             </Home>} >

          </Route>
          <Route path="*" render={() => <Navigate to="/"/>} />
          <Route path="/" render={() => <Navigate to="/login"/>} />
          <Route path="/:url*(/+)" render={()=> <Navigate to={pathname.slice(0,-1)}/>}/>
        </Routes>
       {/*<Navigate from="/:url*(/+)" to={pathname.slice(0, -1)} replace={true} /> -->
        
  <Navigate from="*" to="/" replace={true}/> */}
  
      </div>
    </div>
    </>
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
