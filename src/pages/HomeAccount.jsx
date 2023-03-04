import React from "react";

export default function Home(props) {
  return (
    <div className="card mt-5 text-center">
      <div className="card-body">
        <h1>Ciao {props.AT}</h1>
      </div>
    </div>
  );
}
