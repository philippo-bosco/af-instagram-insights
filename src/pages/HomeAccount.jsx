import React from "react";

export default function Home({ isAuth, toggleAuth, AT, ToggleAT }) {
  return (
    <div className="card mt-5 text-center">
      <div className="card-body">
        <h1>Benvenuto questo è il tuo accessToken: {AT}</h1>
      </div>
    </div>
  );
}
