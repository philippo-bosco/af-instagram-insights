import React, { useState, useEffect } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

//import custom
import LastPostInsights from "../components/LastPost";
import {
  CityGraph,
  CountryGraph,
  LangChart,
  FollowerCountGraph,
  GenderAgeChart,
} from "../components/Grafici";

/** TODO phil:
 * - eseguire controllo persistenza scheda a refresh pagina
 * - eseguire le richieste a periodo variabile con default "day" al caricamento del componente
 */

export default function HomeInsights() {
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("today");
  const [timeOption1, setTimeOption1] = useState("day");
  const [timeOption2, setTimeOption2] = useState("day");
  const [responseFollower, setResponseFollower] = useState(null); //response follower count
  const [responseImpression, setResponseImpression] = useState(null); //response impressions count
  const [responseReach, setResponseReach] = useState(null); //response reach count
  const [responseLifeTime, setResponseLifetime] = useState(null); //response request lifetime Component onLoad
  const [responseDay, setResponseDay] = useState(null); //response request day Component

  //secureLocalStorage informations
  const storedIgID = secureLocalStorage.getItem("IgID");
  const storedAT = secureLocalStorage.getItem("AT");

  //funzione al caricamento del componente
  useEffect(() => {
    setIsLoading(true);
    const storedIgID = secureLocalStorage.getItem("IgID");
    const storedAT = secureLocalStorage.getItem("AT");
    if (storedAT && storedIgID) {
      fetchLifetimeReq();
      fetchDay();
    }
    //fetch lifetime requests
    async function fetchLifetimeReq() {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=audience_city,audience_country,audience_gender_age,audience_locale&period=lifetime&access_token=${storedAT}`
      );
      console.log(
        "audience_city,audience_country,audience_gender_age,audience_locale"
      );
      setResponseLifetime(response.data);
      console.log(response.data.data[2]);
    }
    //fetch day requests
    async function fetchDay() {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=profile_views,get_directions_clicks,email_contacts&period=day&access_token=${storedAT}`
      );
      console.log(
        "response (profile_views,get_directions_clicks,email_contact):"
      );
      const responseDayInfo = {
        profile_views: response.data.data[0].values[1].value,
        geo_clicks: response.data.data[1].values[1].value,
        email_contacts: response.data.data[2].values[1].value,
      };
      console.log(responseDayInfo); //prova
      setResponseDay(responseDayInfo);
      console.log(response.data);
    }
    setIsLoading(false);
  }, [setIsLoading]);

  //funzioni che settano il valore dello state in base al valore "option" selezionato dal dropdown menu
  const handleTimeframeChange = event => {
    setTimeframe(event.target.value);
  };

  const handleTimeOptionChange1 = event => {
    setTimeOption1(event.target.value);
  };

  const handleTimeOptionChange2 = event => {
    setTimeOption2(event.target.value);
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
      console.log("profile follower:");
      console.log(response.data); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
      setResponseFollower(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Profile Impression request (variable)
  const handleImpressionsReq = async () => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?period=${timeOption1}&metric=impressions&access_token=${storedAT}`
      );
      console.log("profile impression:");
      console.log(response.data); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
      setResponseImpression(response.data.data[0].values[0].value);
    } catch (error) {
      console.error(error);
    }
  };

  //Profile reach request (variable)
  const handleReachReq = async () => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?period=${timeOption2}&metric=reach&access_token=${storedAT}`
      );
      console.log("reach:");
      console.log(response.data); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
      setResponseReach(response.data.data[0].values[0].value);
    } catch (error) {
      console.error(error);
    }
  };

  //stringify section (solo per mostrare a video, verrà rimossa)
  //const parsedFollowerCount = JSON.stringify(responseFollower);
  //const parsedLifetime = JSON.stringify(responseLifeTime);
  //const parsedDay = JSON.stringify(responseDay);
  //const parsedImpression = JSON.stringify(responseImpression);
  //const parsedReach = JSON.stringify(responseReach);

  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <div>
      <div id="follower-count">
        <h3>Richiesta follower Count (console):</h3>
        <select value={timeframe} onChange={handleTimeframeChange}>
          <option value="today">Oggi</option>
          <option value="week">Una settimana</option>
          <option value="month">Un mese</option>
        </select>
        <button onClick={handleFollowerCountReq}>Invia richiesta</button>
        {responseFollower && (
          <div style={{ width: "600px", height: "600px" }}>
            <FollowerCountGraph data={responseFollower.data} />
          </div>
        )}
      </div>
      <div id="impression">
        <h3>richiesta Profile impressions (console):</h3>
        <select value={timeOption1} onChange={handleTimeOptionChange1}>
          <option value="day">Oggi</option>
          <option value="week">Una settimana</option>
          <option value="days_28">Un mese</option>
        </select>
        <button onClick={handleImpressionsReq}>Invia richiesta</button>
        <div>
          <p>{responseImpression}</p>
        </div>
      </div>
      <div id="reach">
        <h3>richiesta Profile reach (console):</h3>
        <select value={timeOption2} onChange={handleTimeOptionChange2}>
          <option value="day">Oggi</option>
          <option value="week">Una settimana</option>
          <option value="days_28">Un mese</option>
        </select>
        <button onClick={handleReachReq}>Invia richiesta</button>
        <div>
          <p>{responseReach}</p>
        </div>
      </div>
      {responseLifeTime && (
        <div id="lifetime">
          <h3> richiesta al caricamento del componente (console):</h3>
          <div>
            <h4>LifeTime request:</h4>
            <div style={{ width: "600px", height: "600px" }}>
              <CityGraph data={responseLifeTime.data} />
            </div>
            <div style={{ width: "600px", height: "600px" }}>
              <CountryGraph data={responseLifeTime.data} />
            </div>
            <div style={{ width: "600px", height: "600px" }}>
              <GenderAgeChart data={responseLifeTime.data} />
            </div>
            <div style={{ width: "600px", height: "600px" }}>
              <LangChart data={responseLifeTime.data} />
            </div>
          </div>
          <div>
            <br />
            <h4>Day request:</h4>
            {responseDay && (
              <div>
                <p>Visite al profilo: {responseDay.profile_views}</p>
                <p>Click luoghi: {responseDay.geo_clicks}</p>
                <p>Contatti email: {responseDay.email_contacts}</p>
              </div>
            )}
          </div>
          <div>
            <h4>Last Post request:</h4>
            <LastPostInsights />
          </div>
        </div>
      )}
    </div>
  );
}
