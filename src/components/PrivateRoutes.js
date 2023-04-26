import { Navigate } from "react-router-dom";
import React from "react";
import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";

export default function PrivateRoutes({ children }) {
  //const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    window.FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        //setIsAuth(true);
        secureLocalStorage.setItem("isAuth", true);
        secureLocalStorage.setItem("AT", response.authResponse?.accessToken);
      } else {
        //setIsAuth(false);
        secureLocalStorage.removeItem("isAuth");
        secureLocalStorage.removeItem("AT");
      }
      console.log(response);
    });
  }, []);
  const isAuth = secureLocalStorage.getItem("isAuth");

  return isAuth ? children : <Navigate to="/login" />;
}
