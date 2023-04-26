import React, { useState, useEffect } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button } from "react-bootstrap";
import CountUp from "react-countup";

//import icons
import {
  faLanguage,
  faEarthAmericas,
  faPersonHalfDress,
  faBuildingUser,
  faLocationDot,
  faEnvelope,
  faUsers,
  faEye,
  faUserPlus,
  faArrowPointer,
} from "@fortawesome/free-solid-svg-icons";

//import custom
import LastPostInsights from "../components/LastPost";
import "../styles/homeinsights.css";
import {
  CityGraph,
  CountryGraph,
  LangChart,
  FollowerCountGraph,
  GenderAgeChart,
} from "../components/Grafici";
import Footer from "../components/Footer";

/** TODO phil:
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
      console.log(response.data);
    }
    //fetch day requests
    async function fetchDay() {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/insights?metric=profile_views,get_directions_clicks,email_contacts&period=day&access_token=${storedAT}`
      );
      //salvo dati che mi servono in un oggetto e lo metto nello useState
      const responseDayInfo = {
        profile_views: response.data.data[0].values[1].value,
        geo_clicks: response.data.data[1].values[1].value,
        email_contacts: response.data.data[2].values[1].value,
        profile_desc: JSON.stringify(response.data.data[0].description),
        geo_desc: JSON.stringify(response.data.data[1].description),
        email_desc: JSON.stringify(response.data.data[2].description),
      };
      setResponseDay(responseDayInfo);
      console.log(
        "response (profile_views,get_directions_clicks,email_contact):"
      );
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
      console.log(response.data);
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
      console.log(response.data);
      const responseInfo = {
        value: response.data.data[0].values[0].value,
        description: response.data.data[0].description,
      };
      setResponseImpression(responseInfo);
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
      console.log(response.data);
      const responseInfo = {
        value: response.data.data[0].values[0].value,
        description: response.data.data[0].description,
      };
      setResponseReach(responseInfo);
    } catch (error) {
      console.error(error);
    }
  };

  //render
  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <>
      <Container fluid className="textinsights  text-uppercase">
        <LastPostInsights />

        <Row
          xs={1}
          sm={1}
          md={2}
          lg={3}
          className="justify-content-between p-4"
        >
          <Col
            className="colorback textinsightsdark ombra"
            md={{ span: 0.5, offset: 0.5 }}
          >
            <Row className="colorback  textprofiledark">
              <center>
                <FontAwesomeIcon
                  icon={faEye}
                  className="blu"
                  title={
                    responseReach &&
                    JSON.stringify(responseImpression.description)
                  }
                />{" "}
                Profile impressions
              </center>
            </Row>
            <select
              value={timeOption1}
              onChange={handleTimeOptionChange1}
              className="dropdown"
            >
              <option value="day">Oggi</option>
              <option value="week">Una settimana</option>
              <option value="days_28">Un mese</option>
            </select>
            <Button
              className="button mb-3 floatright textprofiledark"
              onClick={handleImpressionsReq}
              disabled={isLoading}
              variant="outline-dark"
            >
              INVIA RICHIESTA
            </Button>
            <br></br>

            {responseImpression && (
              <CountUp
                end={responseImpression.value}
                duration={3}
                className="valuesprofiledark  impressiontext"
              />
            )}
          </Col>
          <Col
            className="colorback textinsightsdark ombra"
            md={{ span: 0.5, offset: 0.5 }}
          >
            <Row className="colorback textprofiledark">
              <center>
                <FontAwesomeIcon
                  icon={faUsers}
                  className="verde"
                  title={
                    responseReach && JSON.stringify(responseReach.description)
                  }
                />{" "}
                Profile reach
              </center>
            </Row>

            <select
              value={timeOption2}
              onChange={handleTimeOptionChange2}
              className="dropdown"
            >
              <option value="day">Oggi</option>
              <option value="week">Una settimana</option>
              <option value="days_28">Un mese</option>
            </select>
            <Button
              className="button mb-3 floatright textprofiledark"
              onClick={handleReachReq}
              disabled={isLoading}
              variant="outline-dark"
            >
              INVIA RICHIESTA
            </Button>
            <br></br>
            {responseReach && (
              <CountUp
                end={responseReach.value}
                duration={3}
                className="valuesprofiledark "
              />
            )}
          </Col>
        </Row>
        <Row
          xs={1}
          sm={1}
          md={2}
          lg={5}
          className="justify-content-between p-4"
        >
          {responseDay && (
            <>
              <Col className="colorback ombra" md={{ span: 0.9, offset: 0.9 }}>
                <Row className="textprofiledark text-uppercase text-md-auto colorback">
                  {" "}
                  <center>
                    {" "}
                    <FontAwesomeIcon
                      icon={faArrowPointer}
                      title={responseDay.profile_desc}
                      className="falured"
                    />{" "}
                    Visite al profilo <br></br>giornaliere
                  </center>
                </Row>{" "}
                <CountUp
                  end={responseDay.profile_views}
                  duration={5}
                  className="valuesprofiledark colorback"
                />
              </Col>
              <Col className="colorback ombra" md={{ span: 0.9, offset: 0.9 }}>
                <Row className="textprofiledark text-uppercase text-center colorback">
                  {" "}
                  <center>
                    {" "}
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      title={responseDay.geo_desc}
                      className="sandybrown"
                    />{" "}
                    Click luoghi <br></br>giornaliere
                  </center>
                </Row>{" "}
                <CountUp
                  end={responseDay.geo_click}
                  duration={5}
                  className="valuesprofiledark colorback"
                />{" "}
              </Col>
              <Col className="colorback ombra" md={{ span: 0.9, offset: 0.9 }}>
                <Row className="textprofiledark text-uppercase text-center colorback">
                  {" "}
                  <center>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      title={responseDay.email_desc}
                      className="indigodye"
                    />{" "}
                    Contatti email <br></br>giornaliere
                  </center>
                </Row>{" "}
                <CountUp
                  end={responseDay.email_contacts}
                  duration={5}
                  className="valuesprofiledark colorback"
                />{" "}
              </Col>
            </>
          )}
        </Row>

        {responseLifeTime && (
          <>
            <Row
              xs={1}
              sm={1}
              md={2}
              lg={4}
              className="d-flex flex-wrap justify-content-center p-4 "
              fluid="true"
            >
              <Col>
                <h3>
                  <FontAwesomeIcon
                    icon={faBuildingUser}
                    title={JSON.stringify(responseLifeTime.data[0].description)}
                    className="myrtlegreen"
                  />{" "}
                  Grafico delle città
                </h3>
                <CityGraph data={responseLifeTime.data} />
              </Col>
              <Col>
                <h3>
                  <FontAwesomeIcon
                    icon={faEarthAmericas}
                    title={JSON.stringify(responseLifeTime.data[1].description)}
                    className="chartreuse"
                  />{" "}
                  Grafico delle Nazioni
                </h3>
                <CountryGraph data={responseLifeTime.data} />
              </Col>
              <Col>
                <h3>
                  <FontAwesomeIcon
                    icon={faLanguage}
                    title={JSON.stringify(responseLifeTime.data[3].description)}
                    className="cocoabrown"
                  />{" "}
                  Grafico delle lingue
                </h3>
                <LangChart data={responseLifeTime.data} />
              </Col>
            </Row>
            <Row xs={1} sm={1} lg={2}>
              <Col className="align-items-center">
                <h3>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="cianofluo"
                    title={
                      responseFollower &&
                      JSON.stringify(responseFollower.data[0].description)
                    }
                  />{" "}
                  grafico follower Count
                </h3>

                {responseFollower && (
                  <FollowerCountGraph data={responseFollower.data} />
                )}
                <div className="mt-2">
                  <select
                    value={timeframe}
                    onChange={handleTimeframeChange}
                    className="dropdown"
                  >
                    <option value="today">Oggi</option>
                    <option value="week">Una settimana</option>
                    <option value="month">Un mese</option>
                  </select>
                  <Button
                    className="button mb-3 floatright  textprofiledark"
                    onClick={handleFollowerCountReq}
                    disabled={isLoading}
                    variant="outline-dark"
                  >
                    Invia richiesta
                  </Button>
                </div>
              </Col>
              <Col>
                <h3>
                  {" "}
                  <FontAwesomeIcon
                    icon={faPersonHalfDress}
                    title={JSON.stringify(responseLifeTime.data[2].description)}
                    className="skobeloff"
                  />{" "}
                  Grafico di genere per età
                </h3>{" "}
                <GenderAgeChart data={responseLifeTime.data} />
              </Col>
            </Row>
          </>
        )}
      </Container>
      <Footer></Footer>
    </>
  );
}
