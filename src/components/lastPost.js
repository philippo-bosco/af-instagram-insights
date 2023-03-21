import secureLocalStorage from "react-secure-storage";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LastPostInsights() {
  const [metricsPost, setMetricsPost] = useState(null);

  //secure local storage gets

  useEffect(() => {
    const storedIgID = secureLocalStorage.getItem("IgID");
    const storedAT = secureLocalStorage.getItem("AT");
    const storedLastPost = JSON.parse(secureLocalStorage.getItem("lastPost"));

    if (storedIgID && storedAT) {
      fetchLastPost();
    }
    async function fetchLastPost() {
      const lastPostType = storedLastPost.media_type;
      const metrics = getMetricsInfo(lastPostType);
      console.log(metrics);
      const requestUrl = `https://graph.facebook.com/v16.0/${storedLastPost.id}/insights?metric=${metrics}&access_token=${storedAT}`;
      try {
        const response = await axios.get(requestUrl);
        console.log(response.data); //chiedere se va bene questo formato ad Ale e nel caso cambiare setResponse con questo. console.log deve mostrare reesponse completa
        setMetricsPost(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

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

  const parsedMetricPost = JSON.stringify(metricsPost);
  //render
  return (
    <div>
      <p>{parsedMetricPost}</p>
    </div>
  );
}
