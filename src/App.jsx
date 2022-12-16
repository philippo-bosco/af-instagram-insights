import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");

  // Controllo se l'utente è già autenticato con Facebook
  /*  useEffect(() => {
    window.FB.getLoginStatus(response => {
      setFacebookUserAccessToken(response.authResponse?.accessToken);
    });
  }, []);*/

  // LOGIN con Facebook
  const logInToFB = () => {
    window.FB.login(
      response => {
        setFacebookUserAccessToken(response.authResponse?.accessToken);
      },
      {
        // Scopes that allow us to publish content to Instagram
        scope: "instagram_basic,pages_show_list",
      }
    );
  };

  // LOGOUT da Facebook
  const logOutOfFB = () => {
    window.FB.logout(() => {
      setFacebookUserAccessToken(undefined);
    });
  };

  // GET pagine facebook Instagram Business Account
  //TEMPORANEAMENTE DEVO CAPIRE A COSA SERVE STA COSA
  /*  const getFacebookPages = () => {
    return new Promise(resolve => {
      window.FB.api(
        "me/accounts",
        { access_token: facebookUserAccessToken },
        response => {
          resolve(response.data);
        }
      );
    });
  };*/
  return (
    <main id="app-main">
      <div>
        <section className="app-section">
          <h3>1. Log in with Facebook</h3>
          {facebookUserAccessToken ? (
            <button onClick={logOutOfFB} className="btn action-btn">
              Log out of Facebook
            </button>
          ) : (
            <button onClick={logInToFB} className="btn action-btn">
              Login with Facebook
            </button>
          )}
        </section>
      </div>
      {facebookUserAccessToken ? (
        <section className="app-section">
          <h3>Fatto bro</h3>
        </section>
      ) : null}
    </main>
  );
}

export default App;
