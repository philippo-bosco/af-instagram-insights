import React from "react";
/*
TODO:
- implementare la home
- portare l'access token qua dentro
- eseguire un controllo sull'autenticazione, se aggiorno la pagina qui devo rimanere sulla home non tornare al login
(guardare privateRoutes)
*/

export default function Home({ isAuth, toggleAuth, AT, ToggleAT }) {
  return (
    <div className="card mt-5 text-center">
      <div className="card-body">
        <h1>Ciao {AT}</h1>
      </div>
    </div>
  );
}
