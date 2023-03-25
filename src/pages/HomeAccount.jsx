import React, { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";

//import customs
import Post from "../components/Post";
import Carosello from "../components/Carousel";

export default function Home({ isAuth, toggleAuth, AT, toggleAT }) {
  const storedIgID = secureLocalStorage.getItem("IgID");
  const [userFeed, setUserFeed] = useState();

  useEffect(() => {
    const storedIsAuth = secureLocalStorage.getItem("isAuth");
    const storedAT = secureLocalStorage.getItem("AT");

    if (storedIsAuth) {
      toggleAuth(true);
    } else {
      toggleAuth(false);
    }
    toggleAT(storedAT);
    fetchFeed();
    //function feed
    async function fetchFeed() {
      if (AT && storedIgID) {
        const response = await axios.get(
          `https://graph.facebook.com/v16.0/${storedIgID}/media?fields=id%2Ccaption%2Ccomments_count%2Clike_count%2Cmedia_url%2Cowner%2Cpermalink%2Cmedia_type%2Cusername%2Cchildren%7Bmedia_type%2Cmedia_url%2Cowner%2Cthumbnail_url%7D%2Ccomments%7Btext%7D%2Ctimestamp&access_token=${AT}`
        );
        if (response.data) {
          const lastPostInfo = {
            id: response.data.data[0].id,
            media_type: response.data.data[0].media_type,
          };
          setUserFeed(response.data);
          console.log(response.data);
          secureLocalStorage.setItem("lastPost", JSON.stringify(lastPostInfo));
        } else {
          setUserFeed(null);
          secureLocalStorage.setItem("lastPost", "");
        }
      }
    }
  }, [toggleAuth, toggleAT, AT, storedIgID]);

  //render
  return isAuth ? (
    <Container>
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        className="d-flex flex-wrap justify-content-center"
      >
        {userFeed?.data?.map(post => (
          <Col key={post.id} className="my-3">
            {post.media_type === "VIDEO" ? (
              <Post
                src={post.media_url}
                didascalia={post.caption}
                video={true}
              />
            ) : post.media_type === "CAROUSEL_ALBUM" ? (
              <Carosello src={post.children.data} didascalia={post.caption} />
            ) : (
              <Post src={post.media_url} didascalia={post.caption} />
            )}
          </Col>
        ))}
      </Row>
    </Container>
  ) : (
    <div></div>
  );
}
