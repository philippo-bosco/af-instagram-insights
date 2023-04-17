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
    const responsePostInfo = {
      engagement: response.data.data[0].values[0].value,
      impressions: response.data.data[1].values[0].value,
      reach: response.data.data[2].values[0].value,
      saved: response.data.data[3].values[0].value,
      video_views: response.data.data[4].values[0].value,
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
      <div>
        <p>Engagement: {metricsPost.engagement}</p>
        <p>Impressions: {metricsPost.impressions}</p>
        <p>Reach: {metricsPost.reach}</p>
        <p>Saved: {metricsPost.saved}</p>
        <p>Video_views: {metricsPost.video_views}</p>
      </div>
    )
  );
}
