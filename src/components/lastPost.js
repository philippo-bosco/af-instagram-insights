import secureLocalStorage from "react-secure-storage";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "../styles/homeinsights.css";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import icons
import {
  faBookmark,
  faVideo,
  faEye,
  faCircleNodes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
//funzione caricamento componente
async function fetchLastPost(
  storedAT,
  storedLastPost,
  setMetricsPost,
  getMetricsInfo
) {
  const lastPostType = storedLastPost.media_type;
  const lastPostID = storedLastPost.id;
  const metrics = getMetricsInfo(lastPostType);
  console.log(metrics);
  const requestUrl = `https://graph.facebook.com/v16.0/${lastPostID}/insights?metric=${metrics}&access_token=${storedAT}`;
  try {
    const response = await axios.get(requestUrl);
    const responsePostInfo = {
      engagement: response.data.data[0].values[0].value,
      impressions: response.data.data[1].values[0].value,
      reach: response.data.data[2].values[0].value,
      saved: response.data.data[3].values[0].value,
      video_views: response.data.data[4].values[0].value,
      eng_desc: response.data.data[0].description,
      impress_desc: response.data.data[1].description,
      reach_desc: response.data.data[2].description,
      saved_desc: response.data.data[3].description,
      video_desc: response.data.data[4].description,
    };
    console.log(response.data);
    setMetricsPost(responsePostInfo);
  } catch (error) {
    console.error(error);
  }
}

export default function LastPostInsights() {
  const [metricsPost, setMetricsPost] = useState(null);

  useEffect(() => {
    //local storage GET
    const storedIgID = secureLocalStorage.getItem("IgID");
    const storedAT = secureLocalStorage.getItem("AT");
    const storedLastPost = JSON.parse(secureLocalStorage.getItem("lastPost"));

    //controllo
    if (storedIgID && storedAT) {
      fetchLastPost(storedAT, storedLastPost, setMetricsPost, getMetricsInfo);
    }
  }, []);

  //funzione che decide le metriche in base al tipo di media
  const getMetricsInfo = lastPostType => {
    let metricType;
    switch (lastPostType) {
      default:
        break;
      case "VIDEO":
        metricType = "comments,likes,plays,reach,saved";
        break;
      case "REEL":
        metricType = "comments,likes,plays,reach,saved,video_views";
        break;
      case "IMAGE":
        metricType = "engagement,impressions,reach,saved,video_views";
        break;
      case "CAROUSEL_ALBUM":
        metricType =
          "carousel_album_engagement,carousel_album_impressions,carousel_album_reach,carousel_album_saved,carousel_album_video_views";
        break;
    }
    return metricType;
  };

  //render
  return (
    metricsPost && (
      <Row xs={1} sm={1} md={2} lg={6} className="justify-content-between p-4 ">
        <Col className="colorback ombra  " md={{ span: 0.5, offset: 0.5 }}>
          <Row className="textprofiledark  text-uppercase colorback ">
            <center>
              {" "}
              <FontAwesomeIcon
                icon={faEye}
                title={JSON.stringify(metricsPost.eng_desc)}
                className="arancioscuro"
              />{" "}
              Engagement<br></br>ultimo post
            </center>
          </Row>
          <CountUp
            end={metricsPost.engagement}
            duration={3}
            className="valuesprofiledark"
          />
        </Col>
        <Col className="colorback ombra  " md={{ span: 0.5, offset: 0.5 }}>
          <Row className="textprofiledark  text-uppercase colorback ">
            <center>
              <FontAwesomeIcon
                icon={faUsers}
                title={JSON.stringify(metricsPost.impress_desc)}
                className="aranciomedio"
              />{" "}
              Impressions<br></br>ultimo post
            </center>
          </Row>
          <CountUp
            end={metricsPost.impressions}
            duration={3}
            className="valuesprofiledark"
          />
        </Col>
        <Col className="colorback ombra   " md={{ span: 0.5, offset: 0.5 }}>
          <Row className="textprofiledark  text-uppercase colorback ">
            <center>
              <FontAwesomeIcon
                icon={faCircleNodes}
                title={JSON.stringify(metricsPost.reach_desc)}
                className="aranciochiaro"
              />{" "}
              Reach<br></br>ultimo post
            </center>
          </Row>

          <CountUp
            end={metricsPost.reach}
            duration={3}
            className="valuesprofiledark"
          />
        </Col>
        <Col className="colorback ombra  " md={{ span: 0.5, offset: 0.5 }}>
          <Row className="textprofiledark  text-uppercase colorback ">
            <center>
              <FontAwesomeIcon
                icon={faBookmark}
                title={JSON.stringify(metricsPost.saved_desc)}
                className="gialloscuro"
              />{" "}
              Saved<br></br>ultimo post
            </center>
          </Row>
          <CountUp
            end={metricsPost.saved}
            duration={3}
            className="valuesprofiledark"
          />
        </Col>
        <Col className="colorback ombra " md={{ span: 0.5, offset: 0.5 }}>
          <Row className="textprofiledark  text-uppercase colorback ">
            <center>
              <FontAwesomeIcon
                icon={faVideo}
                title={JSON.stringify(metricsPost.video_desc)}
                className="giallochiaro"
              />{" "}
              Video views<br></br>ultimo post
            </center>
          </Row>
          <CountUp
            end={metricsPost.video_views}
            duration={3}
            className="valuesprofiledark"
          />
        </Col>
      </Row>
    )
  );
}
