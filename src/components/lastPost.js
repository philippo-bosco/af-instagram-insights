import secureLocalStorage from "react-secure-storage";
import { useState, useEffect } from "react";
import axios from "axios";

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
    console.log(response.data);
    setMetricsPost(response.data);
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

  //parsed metrics (da rimuovere)
  const parsedMetricPost = JSON.stringify(metricsPost);
  //render
  return (
    <div>
      <p>{parsedMetricPost}</p>
    </div>
  );
}
