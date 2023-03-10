import React from "react";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

/*
TODO phil:
- mostrare feed instagram
- creare un componente per ogni azione che dobbiamo fare "feed Component", "post Component"
*/

export default function Home({ isAuth, toggleAuth, AT, ToggleAT }) {
  const storedIgID = secureLocalStorage.getItem("IgID");

  useEffect(() => {
    const storedIsAuth = secureLocalStorage.getItem("isAuth");
    const storedAT = secureLocalStorage.getItem("AT");

    if (storedIsAuth) {
      toggleAuth(true);
    } else {
      toggleAuth(false);
    }
    ToggleAT(storedAT);
  }, [toggleAuth, ToggleAT]);

  //render
  return isAuth ? (
    <div className="card mt-5 text-center">
      <div className="card-body">
        <h1>Ciao {storedIgID}</h1>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
