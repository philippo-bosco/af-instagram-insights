import React from "react";
import { Route, Routes } from "react-router-dom";

//import custom
import "./styles/App.css";
import Home from "./pages/HomeAccount";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import PageNotFound from "./pages/PageNotFound";
import NavigationBar from "./components/NavBar";
import HomeInsights from "./pages/HomeInsights";

export default function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/stats"
          element={
            <PrivateRoutes>
              <HomeInsights />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
