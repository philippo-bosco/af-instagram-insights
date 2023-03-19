import React, { useState, useEffect } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

/** TODO phil:
 * - eseguire controlli per visualizzare la pagina
 * - eseguire controllo persistenza scheda a refresh pagina
 * X eseguire le richieste a periodo fisso al caricamento del componente
 * - eseguire le richieste a periodo variabile con default "day" al caricamento del componente
 * - prendere ultimo post ed analizzarne gli insights
 */

export default function HomeInsights() {
  const [timeframe, setTimeframe] = useState("today");
  const [timeOption, setTimeOption] = useState("day");
  const [responseFollower, setResponseFollower] = useState(null); //response follower count
  const [responseImpression, setResponseImpression] = useState(null); //response impressions count
  const [responseReach, setResponseReach] = useState(null); //response reach count
  const [responseLifeTime, setResponseLifetime] = useState(null); //response request lifetime Component onLoad
  const [responseDay, setResponseDay] = useState(null);

  //secureLocalStorage informations
  const storedIgID = secureLocalStorage.getItem("IgID");
  const storedAT = secureLocalStorage.getItem("AT");

  //funzione al caricamento del componente
  useEffect(() => {
    const storedAT = secureLocalStorage.getItem("AT");
    const storedIgID = secureLocalStorage.getItem("IgID");
    //eseguire controlli su AT e storedIgID
    async function fetchLifetimeReq() {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=audience_city,audience_country,audience_gender_age,audience_locale&period=lifetime&access_token=${storedAT}`
      );
      setResponseLifetime(response.data);
      console.log(response.data);
    }
    async function fetchDay() {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=profile_views,get_directions_clicks,email_contacts&period=day&access_token=${storedAT}`
      );
      setResponseDay(response.data);
      console.log(response.data);
    }
    fetchLifetimeReq();
    fetchDay();
  }, []);

  //funzioni che settano il valore dello state in base al valore "option" selezionato dal dropdown menu
  const handleTimeframeChange = event => {
    setTimeframe(event.target.value);
  };

  const handleTimeOptionChange = event => {
    setTimeOption(event.target.value);
  };

  //funzione che prende in ingresso il timeframe del dropdown menu e costruisce since & until sulla base dell'opzione
  const getTimestampRange = timeframe => {
    let sinceTimestamp, untilTimestamp;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    switch (timeframe) {
      default:
        break;
      case "today":
        const todayTimestamp = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        sinceTimestamp = Math.floor(todayTimestamp.getTime() / 1000);
        untilTimestamp = Math.floor(today.getTime() / 1000);
        break;
      case "week":
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        sinceTimestamp = Math.floor(oneWeekAgo.getTime() / 1000);
        untilTimestamp = Math.floor(today.getTime() / 1000);
        break;
      case "month":
        const oneMonthAgo = new Date(
          today.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        sinceTimestamp = Math.floor(oneMonthAgo.getTime() / 1000);
        untilTimestamp = Math.floor(today.getTime() / 1000);
        break;
    }
    return { sinceTimestamp, untilTimestamp };
  };

  /* RICHIESTE AXIOS INSIGHTS */

  //Profile follower count request (variable)
  const handleFollowerCountReq = async () => {
    const { sinceTimestamp, untilTimestamp } = getTimestampRange(timeframe);
    const requestUrl = `https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=follower_count&period=day&since=${sinceTimestamp}&until=${untilTimestamp}&access_token=${storedAT}`;
    try {
      const response = await axios.get(requestUrl);
      console.log(response.data.data[0].values); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
      setResponseFollower(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Profile Impression request (variable)
  const handleImpressionsReq = async () => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?period=${timeOption}&metric=impressions&access_token=${storedAT}`
      );
      console.log(response.data.data[0].values[0]); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
      setResponseImpression(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Profile reach request (variable)
  const handleReachReq = async () => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?period=${timeOption}&metric=reach&access_token=${storedAT}`
      );
      console.log(response.data); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
      setResponseReach(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //stringify section (solo per mostrare a video, verrà rimossa)
  const parsedFollowerCount = JSON.stringify(responseFollower);
  const parsedImpression = JSON.stringify(responseImpression);
  const parsedReach = JSON.stringify(responseReach);
  const parsedLifetime = JSON.stringify(responseLifeTime);
  const parsedDay = JSON.stringify(responseDay);

  return (
    <div>
      <div id="follower-count">
        <h3>Richiesta follower Count (console):</h3>
        <select value={timeframe} onChange={handleTimeframeChange}>
          <option value="today">Oggi</option>
          <option value="week">Una settimana</option>
          <option value="month">Un mese</option>
        </select>
        <button onClick={handleFollowerCountReq}>Invia richiesta</button>
        <div>
          <p>{parsedFollowerCount}</p>
        </div>
      </div>
      <div id="impression">
        <h3>richiesta Profile impressions (console):</h3>
        <select value={timeOption} onChange={handleTimeOptionChange}>
          <option value="day">Oggi</option>
          <option value="week">Una settimana</option>
          <option value="days_28">Un mese</option>
        </select>
        <button onClick={handleImpressionsReq}>Invia richiesta</button>
        <div>
          <p>{parsedImpression}</p>
        </div>
      </div>
      <div id="reach">
        <h3>richiesta Profile reach (console):</h3>
        <select value={timeOption} onChange={handleTimeOptionChange}>
          <option value="day">Oggi</option>
          <option value="week">Una settimana</option>
          <option value="days_28">Un mese</option>
        </select>
        <button onClick={handleReachReq}>Invia richiesta</button>
        <div>
          <p>{parsedReach}</p>
        </div>
      </div>
      <div id="lifetime">
        <h3> richiesta al caricamento del componente (console):</h3>
        <div>
          <p>{parsedLifetime}</p>
        </div>
        <div>
          <p>{parsedDay}</p>
        </div>
      </div>
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
 * https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=follower_count,impressions, reach + parametri di tempo da definire
 */

/** richiesta di prova:
  curl -i -X GET \
 "https://graph.facebook.com/v16.0/${storedIgId}/insights?period=${periodTime}&metric=reach&access_token=${storedAT}"
 */

/** RICHIESTA x ULTIMO POST del profilo:
  * richiesta get REEL insights metrics:
 "https://graph.facebook.com/v16.0/${lastmedia-ig-id}/insights?metric=comments,likes,plays,reach,saved,shares,total_interactions&access_token=${storedAT}"

   * richiesta get VIDEO & FOTO insights metrics:
 "https://graph.facebook.com/v16.0/${lastmedia-ig-id}/insights?metric=engagement,impressions,reach,saved,video_views&access_token=${storedAT}"

    * richiesta get CAROUSEL insights metrics:
 "https://graph.facebook.com/v16.0/${lastmedia-ig-id}/insights?metric=carousel_album_engagement,carousel_album_impressions,carousel_album_reach,carousel_album_saved,carousel_album_video_views&access_token=${storedAT}"

  * Controllo se è un video+foto/reel/corousel (hanno metriche diverse disponibili)
  * creare ${metrics} che rimpiazzi le metriche per la richiesta in base al tipo di contenuto multimediale passato
  * useState "lastmedia-ig-id" conterrà sia media-ig-id sia il tipo di media, per eseguire il controllo
 */
