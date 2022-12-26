import React from "react";
import { Route, Redirect } from "react-router-dom";

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
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}
