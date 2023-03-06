import React from "react";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
/*
TODO:
- implementare la home
- mostrare feed instagram
*/

export default function Home({ isAuth, toggleAuth, AT, ToggleAT }) {
  useEffect(() => {
    //securelocalstorage
    const storedIsAuth = secureLocalStorage.getItem("isAuth");
    const storedAT = secureLocalStorage.getItem("AT");
    //localstorage
    /*const storedIsAuth = localStorage.getItem("isAuth");
    const storedAT = localStorage.getItem("AT");*/
    if (storedIsAuth) {
      toggleAuth(true);
    } else {
      toggleAuth(false);
    }
    ToggleAT(storedAT);
  }, [toggleAuth, ToggleAT]);
  return isAuth ? (
    <div className="card mt-5 text-center">
      <div className="card-body">
        <h1>Ciao {AT}</h1>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
