import React, { useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export default function HomeInsights() {
  const [timeframe, setTimeframe] = useState("today");
  const [timeOption, setTimeOption] = useState("day");
  const [response, setResponse] = useState(null); //response follower count
  const [response2, setResponse2] = useState(null); //response impressions count
  const [response3, setResponse3] = useState(null); //response reach count
  const storedIgID = secureLocalStorage.getItem("IgID");
  const storedAT = secureLocalStorage.getItem("AT");

  const handleTimeframeChange = event => {
    setTimeframe(event.target.value);
  };

  const handleTimeOptionChange = event => {
    setTimeOption(event.target.value);
  };

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

  //Profile follower count request
  const handleFollowerCountReq = async () => {
    const { sinceTimestamp, untilTimestamp } = getTimestampRange(timeframe);
    const requestUrl = `https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=follower_count&period=day&since=${sinceTimestamp}&until=${untilTimestamp}&access_token=${storedAT}`;
    try {
      const response = await axios.get(requestUrl);
      console.log(response.data.data[0].values); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Profile Impression request
  const handleImpressionsReq = async () => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?period=${timeOption}&metric=impressions&access_token=${storedAT}`
      );
      console.log(response.data.data[0].values[0]); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
      setResponse2(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Profile reach request
  const handleReachReq = async () => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?period=${timeOption}&metric=reach&access_token=${storedAT}`
      );
      console.log(response.data); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
      setResponse3(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //stringify section
  const parsedFollowerCount = JSON.stringify(response);
  const parsedImpression = JSON.stringify(response2);
  const parsedReach = JSON.stringify(response3);

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
