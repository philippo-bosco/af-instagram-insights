import React, { useState } from "react";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Post from "../components/post";
import Carosello from "../components/carusel";
export default function Home({ isAuth, toggleAuth, AT, ToggleAT }) {
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
    ToggleAT(storedAT);
    async function fetchFeed() {
      if (AT && storedIgID) {
        const response = await axios.get(
          `https://graph.facebook.com/v16.0/${storedIgID}/media?fields=id%2Ccaption%2Ccomments_count%2Clike_count%2Cmedia_url%2Cowner%2Cpermalink%2Cmedia_type%2Cusername%2Cchildren%7Bmedia_type%2Cmedia_url%2Cowner%2Cthumbnail_url%7D%2Ccomments%7Btext%7D%2Ctimestamp&access_token=${AT}`
        );
        setUserFeed(response.data);
      }
    }
    fetchFeed();
  }, [toggleAuth, ToggleAT, AT, storedIgID]);

  //render
  return isAuth ? (
    <div className="card mt-5 text-center">
      <div className="card-body">
        {userFeed && (
          <div>
            <h1>Ciao {storedIgID}</h1>
            {userFeed.data.map(post => (
              <div key={post.id}>
                {post.media_type === "VIDEO" ? (
                  <Post
                  video={true}
                  src={post.media_url}
                  didascalia={post.caption}
                />
                ) : (
                  post.media_type === "CAROUSEL_ALBUM" ? (
                    <div>
                      {console.log(post)}
                      <div key={post.children.data + 1}> 
                           <Carosello
                           src={post.children.data}
                           
                            />
                      </div>
                
                  </div>

                  ) : (
                    <Post 
                    src={post.media_url}
                    didascalia={post.caption}
                  />
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
}