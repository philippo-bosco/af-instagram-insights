import React, { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";

//import customs
import Post from "../components/Post";
import Carosello from "../components/Carousel";
import Footer from "../components/Footer";

export default function Home() {
  const storedIgID = secureLocalStorage.getItem("IgID");
  const storedAT = secureLocalStorage.getItem("AT");
  const [isAuth, setIsAuth] = useState();
  const [userFeed, setUserFeed] = useState();

  useEffect(() => {
    // Execute the API request only if both AT and storedIgID exist

    async function fetchFeed() {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/${storedIgID}/media?fields=id%2Ccaption%2Ccomments_count%2Clike_count%2Cmedia_url%2Cowner%2Cpermalink%2Cmedia_type%2Cusername%2Cchildren%7Bmedia_type%2Cmedia_url%2Cowner%2Cthumbnail_url%7D%2Ccomments%7Btext%7D%2Ctimestamp&access_token=${storedAT}`
      );
      if (response.data) {
        setIsAuth(true);
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
    fetchFeed();
  }, [storedIgID, storedAT]);

  //render
  return isAuth ? (
    <>
      <Container fluid>
        <Row xs={1} sm={2} md={3} lg={4}>
          {userFeed?.data?.map(post => (
            <Container key={post.id}>
              <Col
                key={post.id}
                className=" col-md-auto align-self-start "
                fluid="true"
              >
                {post.media_type === "VIDEO" ? (
                  <Post
                    src={post.media_url}
                    didascalia={post.caption}
                    video={true}
                    numero_commenti={post.comments_count}
                    numero_like={post.like_count}
                    datetime={post.timestamp}
                  />
                ) : post.media_type === "CAROUSEL_ALBUM" ? (
                  <Carosello
                    src={post.children.data}
                    didascalia={post.caption}
                    numero_commenti={post.comments_count}
                    numero_like={post.like_count}
                    datetime={post.timestamp}
                  />
                ) : (
                  <Post
                    src={post.media_url}
                    didascalia={post.caption}
                    numero_commenti={post.comments_count}
                    numero_like={post.like_count}
                    datetime={post.timestamp}
                  />
                )}
              </Col>
            </Container>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  ) : (
    <div></div>
  );
}
