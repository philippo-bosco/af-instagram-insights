//questo file deve essere usato per tutte le funzioni di callback della applicazione, in modo da trovare tutto qui sopra e utilizzare le risposte di una funzione per eseguirne altre.

import { history } from "../helpers/history";
//import React from "react";

export const AccountService = {
  //add functions to export
  statusChangeCallback,
  logout,
  Login,
  getFacebookPages,
  getInstagramAccountId,
  //PROVA
};

async function Login() {
  window.FB.login(
    response => {
      console.log(response);
    },
    {
      // Scopes that allow us to publish content to Instagram
      scope: "instagram_basic,pages_show_list",
    }
  );

  const { from } = history.location.state || { from: { pathname: "/" } };
  history.push(from);
}

async function statusChangeCallback(authResponse) {
  console.log("statusChangeCallback");
  console.log(authResponse);
  if (authResponse.status === "connected") {
    let stato = authResponse.status;
    return stato;
  } else {
    console.log("accedi pls");
    history.push("/login");
  }
}

function logout() {
  // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
  window.FB.api("/me/permissions", "delete", null, () => window.FB.logout());
  history.push("/login");
}

// Funzione di prova per vedere se ho fatto giusto o no
function testApi() {
  console.log("Welcome!  Fetching your information.... ");
  window.FB.api("/me?fields=name,email,birthday", function (response) {
    console.log("Successful login for: " + response.name);
  });
}

// --- FUNCTIONS for SETUP INSTAGRAM ACCOUNT
function getFacebookPages() {
  return new Promise(resolve => {
    window.FB.api(
      "me/accounts",
      { access_token: Login.facebookUserAccessToken },
      response => {
        resolve(response.data);
      }
    );
  });
}

//Login.facebookAccessToken non esiste bisogna prenderlo dalla risposta
function getInstagramAccountId(facebookPageId) {
  return new Promise(resolve => {
    window.FB.api(
      facebookPageId,
      {
        access_token: Login.facebookUserAccessToken,
        fields: "instagram_business_account",
      },
      response => {
        resolve(response.instagram_business_account.id);
      }
    );
  });
}

// ---------------------

// FUNCTIONS TEMPLATE
/*async function login() {
  // login with facebook then authenticate with the API to get a JWT auth token
  const { authResponse } = await new Promise(window.FB.login);
  if (!authResponse) return;

  await apiAuthenticate(authResponse.accessToken);

  // get return url from location state or default to home page
  const { from } = history.location.state || { from: { pathname: "/" } };
  history.push(from);
}


async function apiAuthenticate(accessToken) {
  // authenticate with the api using a facebook access token,
  // on success the api returns an account object with a JWT auth token
  const response = await axios.post(`${baseUrl}/authenticate`, { accessToken });
  const account = response.data;
  console.log(accessToken);
  accountSubject.next(account);
  return account;
}*/
