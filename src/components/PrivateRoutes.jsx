import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";

export default function PrivateRoutes({ isAuth, toggleAuth }) {
  useEffect(() => {
    const storedIsAuth = secureLocalStorage.getItem("isAuth");
    if (storedIsAuth) {
      toggleAuth(true);
    } else {
      toggleAuth(false);
    }
  }, [toggleAuth]);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}