import React from "react";
import { useState } from "react";

//import custom
import "./styles/App.css";
import Home from "./pages/HomeAccount";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
//import PageNotFound from "./pages/PageNotFound";
import NavigationBar from "./components/NavBar";
import Grafici from "./pages/grafici"
/*
 * TODO phil:
 * - aggiungere pagina /Insights
 * - aggiungere bottoni navbar (home + insights)
 * - aggiungere controlli PrivateRoutes /Insights
 */

export default function App() {
  const [isAuthenticated, setisAuthenticated] = useState(null);
  const [FBaccessTOKEN, setFBaccessToken] = useState("");

  return (
    <div>
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
    </div>
  );
}