//import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

/*
IDEA: questo file contiene le funzioni che servono per caricare la pagina instagram ed 
effettuare sulla home le richieste che ci servono.
Queste funzioni devono essere caricate in modo asincrono e devono essere chiamate da Login o HomeAccount
le funzioni in questione sono: getFacebookPages, getInstagramAccountId
l'obiettivo di questo file è quello di scrivere nel secure-local-storage l'ig-user-id derivante da queste
funzioni ed utilizzarlo insieme all'accessToken per effettuare tutte le richieste che vogliamo
*/

const getFacebookPages = responseAT => {
  //const storedAT = secureLocalStorage.getItem("AT");
  return new Promise(resolve => {
    window.FB.api("me/accounts", { access_token: responseAT }, response => {
      resolve(response.data);
      console.log(response);
    });
  });
};

const getInstagramAccountId = facebookPageId => {
  const storedAT = secureLocalStorage.getItem("AT");
  return new Promise(resolve => {
    window.FB.api(
      facebookPageId,
      {
        access_token: storedAT,
        fields: "instagram_business_account",
      },
      response => {
        resolve(
          secureLocalStorage.setItem(
            "IgID",
            response.instagram_business_account.id
          )
        );
        console.log(response);
      }
    );
  });
};

export default async function LoadInstagramAccount(responseLogin) {
  const facebookPages = await getFacebookPages(
    responseLogin.authResponse?.accessToken
  );
  const instagramAccountId = await getInstagramAccountId(facebookPages[0].id);

  console.log("tutt'apposto bro");
}
