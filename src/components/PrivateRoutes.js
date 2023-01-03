import { Outlet, Navigate } from "react-router-dom";
import React from "react";

export default function PrivateRoutes({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
