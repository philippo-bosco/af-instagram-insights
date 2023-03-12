<<<<<<< Updated upstream
import React from "react";
import Post from "../components/post"
/*
import { useState, useEffect } from "react";
import { Link, renderMatches } from "react-router-dom";

import { AccountService } from "../components/AccountService";
*/
export default function Home(props) {
  return (
    <div>
      <Post src={props.link} didascalia={props.didascalia}/>
=======
import React, { useState } from "react";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Post from "../components/Post.jsx"
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
                  <video controls>
                    <source src={post.media_url} type="video/mp4" />
                  </video>
                ) : (
                  <img src={post.media_url} alt={post.caption} />
                )}
                <p>{post.caption}</p>
                {post.children && post.children.data.length > 0 && (
                  <div>
                    {post.children.data.map(childPost => (
                      <div key={childPost.id + 1}>
                        {childPost.media_type === "VIDEO" ? (
                          <video controls>
                            <source
                              src={childPost.media_url}
                              type="video/mp4"
                            />
                          </video>
                        ) : (
                          <Post>
                            src={childPost.media_url}
                            didascalia={childPost.caption}
                          </Post>
                        )}
                        <p>{childPost.caption}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
>>>>>>> Stashed changes
    </div>
  );
}
