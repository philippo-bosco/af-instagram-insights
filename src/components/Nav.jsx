import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AccountService } from "./AccountService";

export function Nav() {
  const [account, setAccount] = useState(null);
  useEffect(() => {
    AccountService.account.subscribe(x => setAccount(x));
  }, []);

  // only show nav when logged in
  if (!account) return null;
  /*TEMPORANEO. da personalizzare: 
    - aggiungere benvenuto NOME_ACCOUNT + foto + info base followers, follow, n. post
    - lasciare bottone LOGOUT
    - mettere nav --> POST | INSIGHTS
  */
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav">
        <NavLink exact to="/" className="nav-item nav-link">
          Home
        </NavLink>
        <button
          className="btn btn-link nav-item nav-link"
          onClick={AccountService.logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
