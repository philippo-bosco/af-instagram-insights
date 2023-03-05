import React from "react";
import { useState } from "react";

//import custom
import "./App.css";
import Home from "./pages/HomeAccount";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
//import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/NavBar";

export default function App() {
  const [isAuthenticated, setisAuthenticated] = useState(null);
  const [FBaccessTOKEN, setFBaccessToken] = useState("");
  //const pathname = useLocation().pathname || "";

  //non cè ancora un controllo se il tipo è gia stato autenticato o no

  return (
    <div>
      <Navbar isAuth={isAuthenticated} />
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
    </div>
  );
}
