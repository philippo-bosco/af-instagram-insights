import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export default function HomeInsights({ isAuth, toggleAuth, AT, ToggleAT }) {
  const storedIgID = secureLocalStorage.getItem("IgID");
  const [userInsights, setUserInsights] = useState(); //uno dei tanti useState che useremo per le varie metriche

  return (
    <div>
      <h1>ciao questa è la sezione insights di {storedIgID}</h1>
    </div>
  );
}

/**
 * Richieste da effettuare:
 * - lifetime only request axios:
 * https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=audience_city,audience_country,audience_gender_age,audience_locale&period=lifetime$access_token=${storedAT}
 * - day only request axios:
 * https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=get_directions_clicks,profile_views,text_message_clicks,website_clicks&period=day$access_token=${storedAT}
 * - period changeable requests:
 * https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=follower_count + parametri di tempo da definire
 */

/**
 * DATA odierna:
 * // Ottenere la data di oggi
const today = new Date();

// Calcolare la data di un mese fa
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

//calcolare la data di una settimana fa
const oneWeekAgo = new Date();
oneWeekAgo.setDate(today.getDate() - 7);

// Convertire le date in timestamp UNIX
const sinceTimestamp = Math.floor(oneMonthAgo.getTime() / 1000);
const untilTimestamp = Math.floor(today.getTime() / 1000);

// Comporre la richiesta utilizzando i timestamp generati
const requestUrl = `https://graph.facebook.com/v16.0/{ig-user-id}/insights?metric=follower_count&period=day&since=${sinceTimestamp}&until=${untilTimestamp}&access_token={accessToken}`;
// Esempio con axios:
axios.get(requestUrl).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});

*/
