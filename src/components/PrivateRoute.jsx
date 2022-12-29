import React from "react";
import { Route, Navigate } from "react-router-dom";

import { AccountService } from "./AccountService";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        console.log(props);
        //modificare questa parte
        const logged = () => {
          AccountService.statusChangeCallback();
        };
        if (logged.status !== "connected") {
          // not logged in so redirect to login page with the return url
          return (
            <Navigate
              to={{ pathname: "/login", state: { from: props.location } }} replace={true}
            />
          );
        }
        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}
