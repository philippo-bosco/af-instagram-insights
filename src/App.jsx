/**
 * TODO
 * - sistemare privateRoute (non so come si fa a reindirizzare con i dati che ho)
 * - sistemare Login Page perchè annulla la form (probabile errore di routing)
 * - sistemare funzioni di cattura account Instagram in AccountService.js
 */

//import React libraries
import React from "react";
<<<<<<< Updated upstream
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
=======
import { useState } from "react";
import Grafici from "./pages/grafici.jsx"
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
      <NavigationBar isAuth={isAuthenticated} toggleAuth={setisAuthenticated} />
      <Routes>
        {/*<Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />*/}
        <Route
          path="/login"
          element={
            <Login
              isAuth={isAuthenticated}
              toggleAuth={setisAuthenticated}
              AT={FBaccessTOKEN}
              ToggleAT={setFBaccessToken}
            />
          }
        />
        <Route
          element={
            <PrivateRoutes
              isAuth={isAuthenticated}
              toggleAuth={setisAuthenticated}
            />
          }
        >
          <Route
            path="/"
            element={
              <Home
                isAuth={isAuthenticated}
                toggleAuth={setisAuthenticated}
                AT={FBaccessTOKEN}
                ToggleAT={setFBaccessToken}
              />
            }
            exact
          />
        </Route>
        {/*<Route path="*" element={<PageNotFound />} />*/}
      </Routes>
      <Routes>
          <Route path="/stats" element={<Grafici></Grafici>}/>
          <Route exact path="/home" element={<Home>
                                             </Home>} >

          </Route>
        </Routes>
>>>>>>> Stashed changes
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
