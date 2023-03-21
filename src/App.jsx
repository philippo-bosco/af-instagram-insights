import React from "react";
import { useState } from "react";

//import custom
import "./App.css";
import Home from "./pages/HomeAccount";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
//import PageNotFound from "./pages/PageNotFound";
import NavigationBar from "./components/NavBar";
import HomeInsights from "./pages/HomeInsights";

/*
 * TODO phil:
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
              toggleAT={setFBaccessToken}
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
            exact
            path="/"
            element={
              <Home
                isAuth={isAuthenticated}
                toggleAuth={setisAuthenticated}
                AT={FBaccessTOKEN}
                toggleAT={setFBaccessToken}
              />
            }
          />
          <Route exact path="/stats" element={<HomeInsights />} />
        </Route>
        {/*<Route path="*" element={<PageNotFound />} />*/}
      </Routes>
    </div>
  );
}
